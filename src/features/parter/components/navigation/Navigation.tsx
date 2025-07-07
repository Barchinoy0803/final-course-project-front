import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import PartnerPopup from "../partner-popup/PartnerPopup";
import { NavLink } from "react-router-dom";
import useGetRole from "@/shared/hooks/useGetRole";
import { Role } from "@/shared/const";
import "./style.css";
import { useShow } from "@/shared/hooks/useShow";

const Navigation = () => {
  const { handleCancel, handleShow, isModalOpen } = useShow();
  const role = useGetRole();
  return (
    <>
      <div className="mb-4 flex justify-between">
        <div className="flex gap-4">
          <NavLink
            end={true}
            className={"navigation-link  py-0.5 text-gray-500 relative"}
            to={role === Role.customer ? "/" : ""}
          >
            Active
          </NavLink>
          <NavLink
            className={"navigation-link  py-0.5 text-gray-500 relative"}
            to={role === Role.customer ? "customer/archive" : "archive"}
          >
            Archive
          </NavLink>
          <NavLink
            className={"navigation-link  py-0.5 text-gray-500 relative"}
            to={role === Role.customer ? "customer/disabled" : "disabled"}
          >
            O'chirilganlar
          </NavLink>
        </div>
        <div>
          <Button onClick={handleShow} type="primary">
            <PlusOutlined />
          </Button>
        </div>
      </div>
      {isModalOpen && (
        <PartnerPopup
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          // previousData={{fullname:"john", address: "Namangan", phone:"99812345678"}}
        />
      )}
    </>
  );
};

export default React.memo(Navigation);
