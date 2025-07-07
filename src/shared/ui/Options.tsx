import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import React from "react";

const Options = ({items}:{items:any}) => {
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button>
        <MoreOutlined />
      </Button>
    </Dropdown>
  );
};

export default React.memo(Options);
