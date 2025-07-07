import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./style.css";
import { SIDEBAR_DATA } from "@/shared/static";

const Sidebar = ({ show }: { show: boolean }) => {
  const {pathname} = useLocation()
  const active = pathname.split("/")[1] === "customer" ? "active" : ""
  
  return (
    <aside
      data-collapse={show}
      className=" h-screen overflow-auto sticky top-0 left-0 bg-white p-4 border-r border-gray-200"
    >
      <div className="flex gap-3 items-center h-10">
        <p className="text-2xl bg-black text-white size-8 min-w-8 flex justify-center items-center rounded-xl">
          B
        </p>
        <p className="text-3xl sidebar-logo">LOGOO</p>
      </div>
      <ul className="my-10">
        {SIDEBAR_DATA?.map((item: any) => (
          <li key={item.id}>
            <NavLink
              className={
                `h-9 p-2 rounded mb-2 sidebar-link flex items-center gap-2 ${item.path === "/" ? active : ""}`
              }
              to={item.path}
            >
              {item.icon}
              <span className="sidebar-item">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default React.memo(Sidebar);
