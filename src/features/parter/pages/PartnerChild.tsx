import React from "react";
import PartnerWrapper from "../components/partner-wrapper/PartnerWrapper";
import {useOutletContext} from "react-router-dom"

const PartnerChild = () => {
   const object:any = useOutletContext()
   
  return (
    <>
      <PartnerWrapper data={object?.data} loading={object?.isFetching} />
    </>
  );
};

export default React.memo(PartnerChild);
