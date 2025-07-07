import Box from "@/shared/ui/Box";
import Title from "@/shared/ui/Title";
import React from "react";
import { usePartner, type IParams } from "../service/usePartner";
import Navigation from "../components/navigation/Navigation";
import { useParamsHook } from "@/shared/hooks/useParamsHook";
import { Badge } from "antd";
import { Outlet, useLocation } from "react-router-dom";

const Partner = ({ role }: { role: string }) => {
  const { getPartners } = usePartner();
  const {getParam} = useParamsHook()
  const page = getParam("page") || "1"
  const search = getParam("search") || ""
  const {pathname} = useLocation()
  const typeName = pathname.split("/")[2] || "active"
  

  const query:IParams = { role, page, sortOrder:"desc", isArchive: false, isActive: "true"}

  if(typeName === "archive"){
    query.isArchive = true
  }
  if(typeName === "disabled"){
    query.isActive = "false"
  }
  if(search){
    query.search = search
  }
  
  const { data, isFetching } = getPartners(query);

  return (
    <Box>
      <Badge count={data?.total} style={{ backgroundColor: '#000' }}>
        <Title className={"mb-4"}>
          {role === "customer" ? "Mijozlar" : "Sotuvchilar"} ro'yhati
        </Title>
      </Badge>
      <Navigation />
      <Outlet context={{data, isFetching}}/>
    </Box>
  );
};

export default React.memo(Partner);
