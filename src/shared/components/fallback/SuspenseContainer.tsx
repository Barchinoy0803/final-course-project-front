import React, { type ReactNode } from "react";
import Loading from "./Loading";

const Suspense = ({ children }: { children: ReactNode }) => {
  return <React.Suspense fallback={<Loading />}>{children}</React.Suspense>;
};

export default Suspense;
