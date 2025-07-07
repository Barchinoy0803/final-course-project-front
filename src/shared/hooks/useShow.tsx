import { useCallback, useState } from "react";

export const useShow = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShow = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleToggle = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, []);

  return { isModalOpen, handleShow, handleCancel, handleToggle };
};
