import { PaymentType, Role } from "@/shared/const";
import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useCallback, useState, type FC, type ReactNode } from "react";
import { NumericFormat } from "react-number-format";
import { usePayment } from "../../service/usePayment";

interface Props {
  children: ReactNode;
  id: string;
  previousData?: any;
  role: string;
}

type FieldType = {
  comment?: string;
  amaunt?: string;
};

const PaymentPopup: FC<Props> = ({ children, id, previousData, role }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createPayment } = usePayment();
  const { isPending } = createPayment;

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleSubmit = (values: FieldType) => {
    const amount = Number(values.amaunt?.replace(/\s/gi, ""));
    let payment = {
      amaunt: amount,
      comment: values.comment,
      partnerId: id,
      paymentType: role === Role.customer ? PaymentType.in : PaymentType.out,
    };
    createPayment.mutate(payment, {
      onSuccess:()=>{
        handleCancel()
      }
    });
  };
  return (
    <>
      <span onClick={showModal}>{children}</span>

      {isModalOpen && (
        <Modal
          title={`${(previousData ? "O'zgartirish" : "To'lov qilish")}`}
          closable={{ "aria-label": "Custom Close Button" }}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={false}
        >
          <Form
            name="basic"
            initialValues={previousData}
            onFinish={handleSubmit}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item<FieldType>
              label="Summa"
              name="amaunt"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <NumericFormat
                allowLeadingZeros
                thousandSeparator={" "}
                customInput={Input}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label="Izoh"
              name="comment"
              rules={[{ required: false }]}
            >
              <TextArea />
            </Form.Item>

            <Form.Item label={null}>
              <Button
                loading={isPending}
                className="w-full"
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default React.memo(PaymentPopup);
