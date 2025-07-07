import React, { type FC, useCallback, useState } from "react";
import { Modal, Button, Typography } from "antd";
import { PhoneOutlined } from "@ant-design/icons";

const { Text } = Typography;

const TelPopUp: FC<{ phoneNumber: string }> = ({ phoneNumber = "" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    !!phoneNumber && (
      <div>
        <Button
          type="text"
          style={{ padding: "0" }}
          onClick={handleOpenModal}
          className="flex items-center gap-2  transition-all"
        >
          <span className="text-base text-text">
            {phoneNumber?.telFormat()}
          </span>
          <PhoneOutlined className="text-lg text-text" />
        </Button>
        {isModalOpen && (
          <Modal
            open={isModalOpen}
            onCancel={() => handleClose()}
            footer={null}
            centered
          >
            <Text className="text-text text-center block">
              <span className="text-xl font-bold">
                {phoneNumber?.telFormat()}
              </span>
            </Text>

            <div className="mt-5 space-y-3">
              <a href={`tel:${phoneNumber}`} className="block">
                <Button type="primary" block>
                  <PhoneOutlined className="text-lg text-text" />
                  <span>Qo'ng'iroq qilish</span>
                </Button>
              </a>
            </div>
          </Modal>
        )}
      </div>
    )
  );
};

export default React.memo(TelPopUp);
