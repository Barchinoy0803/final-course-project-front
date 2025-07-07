import TelPopup from "@/shared/components/tel-popup/TelPopup";
import { LoadingOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { type FC } from "react";
import { Link } from "react-router-dom";
import PaymentPopup from "../../../../payment/components/payment-popup/PaymentPopup";
import useGetRole from "@/shared/hooks/useGetRole";
import PartnerOptions from "../partner-options/PartnerOptions";

interface Props {
  data: undefined | any;
  loading: boolean;
}

const CardView: FC<Props> = ({ data, loading }) => {
  const role = useGetRole();

  return (
    <div className="relative min-h-36">
      {data?.map((item: any, index: number) => (
        <div key={item?.id} className="border-b border-gray-200 p-3">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <span>{index + 1}</span>
              <Link className="font-semibold" to={`/partner/${item.id}`}>
                {item.fullname}
              </Link>
            </div>
            <div>
               <PartnerOptions item={item} />
            </div>
          </div>
          <div className="flex justify-between my-3">
            <div>{item?.adress}</div>
            <div>
              <b
                style={{
                  color:
                    item?.balance < 0
                      ? "crimson"
                      : item?.balance > 0
                      ? "green"
                      : "grey",
                }}
              >
                {item?.balance.fprice()}
              </b>
            </div>
          </div>
          <div className="flex justify-between">
            <TelPopup phoneNumber={item?.phone[0]} />
            <div>
              <PaymentPopup id={item?.id} role={role}>
                <Button>To'lov</Button>
              </PaymentPopup>
            </div>
          </div>
        </div>
      ))}
      {loading && (
        <div className="absolute top-0 left-0 z-[5] w-full h-full bg-white/80 flex justify-center pt-10">
          <div>
            <LoadingOutlined className="text-2xl" />
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(CardView);
