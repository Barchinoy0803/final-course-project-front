import { Button, Table } from "antd";
import React, { type FC } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useParamsHook } from "@/shared/hooks/useParamsHook";
import TelPopup from "@/shared/components/tel-popup/TelPopup";
import PaymentPopup from "../../../../payment/components/payment-popup/PaymentPopup";
import useGetRole from "@/shared/hooks/useGetRole";
import PartnerOptions from "../partner-options/PartnerOptions";
import { PushpinOutlined } from "@ant-design/icons";
// import { Link } from "react-router-dom";

interface Props {
  data: undefined | any;
  loading: boolean;
}

const TableView: FC<Props> = ({ data, loading }) => {
  const { getParam } = useParamsHook();
  const role = useGetRole();
  const page = getParam("page") || "1";

  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      render: (_value: any, item: any, index: number) => {
        return <span>
          <span>{index + 1 + (Number(page) - 1) * 10}</span>
          {
            item.pin &&<PushpinOutlined />
          }
        </span>;
      },
    },
    {
      title: "Ism",
      dataIndex: "fullname",
      key: "fullname",
      render: (text: any, item: any) => {
        return <Link to={`/${role}/${item.id}`}>{text}</Link>;
      },
    },
    {
      title: "Manzil",
      dataIndex: "adress",
      key: "adress",
      render: (text: any) => {
        return <span title={text} className="w-[200px] line-clamp-1 ">{text}</span>;
      },
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      key: "adress",
      render: (text: any) => {
        return <TelPopup phoneNumber={text[0]} />;
      },
    },
    {
      title: "Balans",
      dataIndex: "balance",
      key: "balance",
      render: (number: number) => {
        return (
          <b
            style={{
              color: number < 0 ? "crimson" : number > 0 ? "green" : "grey",
            }}
          >
            {number.fprice()}
          </b>
        );
      },
    },
    {
      title: "Option",
      dataIndex: "option",
      key: "option",
      render: (_text: any, item: any) => {
        return (
          <div className="flex gap-2 justify-end">
            <PaymentPopup role={role} id={item.id}>
              <Button>To'lov</Button>
            </PaymentPopup>
            <PartnerOptions item={item} />
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <Table
        loading={loading}
        dataSource={data}
        rowKey={"id"}
        columns={columns}
        pagination={false}
        scroll={{ x: 900 }}
      />
    </div>
  );
};

export default React.memo(TableView);
