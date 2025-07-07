import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import React, { type FC } from "react";
import Search from "./Search";

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
}

const Nav: FC<Props> = ({ setShow, show }) => {
  return (
    <div className="w-full h-14 bg-white sticky top-0 left-0 flex items-center gap-6 px-4 z-10 border-b border-gray-200">
      <button
        onClick={() => setShow((p) => !p)}
        className="text-xl cursor-pointer"
      >
        {show ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
      </button>
      <Search/>
    </div>
  );
};

export default React.memo(Nav);
