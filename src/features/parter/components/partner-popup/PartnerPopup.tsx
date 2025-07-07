import React from "react";
import { Button, Input, Modal, Form } from "antd";
import { NumericFormat, PatternFormat } from "react-number-format";
import { usePartner } from "../../service/usePartner";
import useGetRole from "@/shared/hooks/useGetRole";
import { useNavigate } from "react-router-dom";

type FieldType = {
  fullname?: string;
  adress?: string;
  phone_primary?: string;
  phone_secondary?: string;
  role?: string;
  balance?: number;
};

interface Props {
  isModalOpen: boolean;
  handleCancel: () => void;
  previousData?: any;
}

const PartnerPopup: React.FC<Props> = ({
  handleCancel,
  isModalOpen,
  previousData,
}) => {
  const role = useGetRole();
  const { createPartner, updatePartner } = usePartner();
  const { isPending } = createPartner;
  const navigate = useNavigate();

  const handleSubmit = (values: FieldType) => {
    values.role = role;
    const phone_secondary = values.phone_secondary?.replace(/\s/gi, "");
    const phone_primary = values.phone_primary?.replace(/\s/gi, "") || "";

    const partner = {
      fullname: values.fullname,
      role: values.role,
      adress: values.adress, // ADRESS | ADDRESS
      phone: [phone_primary],
    };

    if (phone_secondary) {
      if (phone_secondary.startsWith("+998")) {
        partner.phone.push(phone_secondary);
      } else {
        partner.phone.push("+998" + phone_secondary);
      }
    }
    if (!phone_primary.startsWith("+998")) {
      partner.phone[0] = "+998" + phone_primary;
    }

    if (previousData) {
      updatePartner.mutate(
        { id: previousData?.id, body: partner },
        {
          onSuccess: () => {
            handleCancel();
          },
        }
      );
    } else {
      createPartner.mutate(partner, {
        onSuccess: (res) => {
          handleCancel();

          navigate(`/${res.role}/${res.id}`);
        },
      });
    }
  };
  return (
    <>
      <Modal
        title={
          `${role === "seller" ? "Sotuvchi " : "Mijoz "}` +
          `${previousData ? "tahrirlash" : "qo'shish"}`
        }
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
            label="Ism"
            name="fullname"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Manzil"
            name="adress"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Asosiy telefon raqam"
            name="phone_primary"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <PatternFormat
              format="+998 ## ### ## ##"
              mask={"_"}
              allowEmptyFormatting
              customInput={Input}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Telefon raqam"
            name="phone_secondary"
            rules={[
              { required: false, message: "Please input your password!" },
            ]}
          >
            <PatternFormat
              format="+998 ## ### ## ##"
              mask={"_"}
              allowEmptyFormatting
              customInput={Input}
            />
          </Form.Item>

          {!previousData && (
            <Form.Item<FieldType> label="Summa" name="balance">
              <NumericFormat
                allowLeadingZeros
                thousandSeparator={" "}
                customInput={Input}
              />
            </Form.Item>
          )}
          <Form.Item label={null}>
            <Button
              loading={isPending || updatePartner.isPending}
              className="w-full"
              type="primary"
              htmlType="submit"
            >
              {previousData ? "Saqlash" : "Ro'yxatga olish"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PartnerPopup;
