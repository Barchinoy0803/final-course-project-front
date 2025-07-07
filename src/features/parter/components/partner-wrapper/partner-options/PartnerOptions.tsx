import { usePartner } from "@/features/parter/service/usePartner";
import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, type MenuProps } from "antd";
import React from "react";

const PartnerOptions = ({ item }: { item: any }) => {
  const { updatePartner } = usePartner();

  const handleArchive = () => 
    updatePartner.mutate({ id: item.id, body: { isArchive: !item.isArchive } });

  const handlePin = () =>{
    updatePartner.mutate({ id: item.id, body: { pin: !item.pin } });
  }

  const items: MenuProps["items"] = [
    {
      label: <span className=" block" onClick={handlePin}>
        {
          item.pin ? "Unpin" : "Pin"
        }
      </span>,
      key: "0",
    },
    {
      label: <span className=" block" onClick={handleArchive}>Arxivlash</span>,
      key: "1",
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button>
        <MoreOutlined />
      </Button>
    </Dropdown>
  );
};

export default React.memo(PartnerOptions);
