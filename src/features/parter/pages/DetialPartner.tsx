import Box from "@/shared/ui/Box";
import Title from "@/shared/ui/Title";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { usePartner } from "../service/usePartner";
import { Badge, Button, Skeleton, Tag, type MenuProps } from "antd";
import Options from "@/shared/ui/Options";
import TelPopup from "@/shared/components/tel-popup/TelPopup";
import useGetRole from "@/shared/hooks/useGetRole";
import { Role } from "@/shared/const";
import PaymentPopup from "@/features/payment/components/payment-popup/PaymentPopup";
import { useShow } from "@/shared/hooks/useShow";
import PartnerPopup from "../components/partner-popup/PartnerPopup";

const DetialPartner = () => {
  const { id } = useParams();
  const { getPartner, updatePartner } = usePartner();
  const { data, isPending } = getPartner(id || "");
  const role = useGetRole();
  const { handleCancel, handleShow, isModalOpen } = useShow();

  const isActive = data?.isActive && !data?.isArchive;

  const previousData = {
    id: data?.id,
    adress: data?.adress,
    fullname: data?.fullname,
    phone_primary: data?.phone[0]?.slice(4),
    phone_secondary: data?.phone[1]?.slice(4) || "",
  };

  const handleArchive = () => {
    updatePartner.mutate({
      id: id || "",
      body: { isArchive: !data?.isArchive },
    });
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <span className=" block" onClick={handleShow}>
          O'zgartirish
        </span>
      ),
      key: "0",
    },
    {
      label: (
        <span className="block" onClick={handleArchive}>
          {data?.isArchive ? "Arxivdan chiqarish" : "Arxivlash"}
        </span>
      ),
      key: "1",
    },
    {
      label: <span className=" block">Lokatsiya</span>,
      key: "2",
    },
  ];

  return isPending ? (
    <Box>
      <Skeleton active />
    </Box>
  ) : (
    <div className="flex gap-3 flex-col">
      <Box>
        <div className="flex justify-between max-[550px]:flex-col relative">
          <div className=" flex flex-col items-start gap-2">
            <Badge
              count={data?.role === Role.customer ? "Mijoz" : "Sotuvchi"}
              style={{ backgroundColor: "#000" }}
            >
              <Title>{data?.fullname}</Title>
            </Badge>
            <p className=" text-gray-500">{data?.adress}</p>
            <Tag color={isActive ? "green" : data?.isArchive ? "gold" : "red"}>
              {isActive ? "Active" : data?.isArchive ? "Arxiv" : "O'chirilgan"}{" "}
            </Tag>
            <div className="text-sm text-gray-500">
              <p>Ro'yxatga olgan shaxs:</p>
              <Link to={"/"} className="font-bold">
                {data?.createdBy?.fname} {data?.createdBy?.lname}
              </Link>
            </div>
          </div>
          <div className=" flex items-end flex-col gap-2">
            <div className="max-[550px]:absolute top-0 right-0">
              <Options items={items} />
            </div>
            <h2
              style={{
                color:
                  data?.balance < 0
                    ? "crimson"
                    : data?.balance > 0
                    ? "green"
                    : "grey",
              }}
              className="text-2xl font-bold"
            >
              {data?.balance?.fprice()}
            </h2>
            <div>
              <p className="text-xs text-gray-500">Asosiy raqam</p>
              <TelPopup phoneNumber={data?.phone[0]} />
            </div>
            {data?.phone[1] && (
              <div>
                <p className="text-xs text-gray-500">Ikkinchi raqam</p>
                <TelPopup phoneNumber={data?.phone[1]} />
              </div>
            )}
            <div className="flex gap-3">
              <Button>
                {role === Role.customer ? "Sotish" : "Xarid qilish"}
              </Button>
              <PaymentPopup role={role} id={data?.id}>
                <Button>To'lov</Button>
              </PaymentPopup>
            </div>
          </div>
        </div>
      </Box>
      <Box>
        <span>Xaridlar</span>
        <span>To'lovlar</span>
      </Box>
      <Box>
        <Title>Xaridlar</Title>
      </Box>
      {isModalOpen && (
        <PartnerPopup
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          previousData={previousData}
        />
      )}
    </div>
  );
};

export default React.memo(DetialPartner);
