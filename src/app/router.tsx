import { useRoutes } from "react-router-dom";
import { lazy } from "react";
import ProtectRoute from "@/shared/components/router/ProtectRoute";
import GuestRoute from "@/shared/components/router/GuestRoute";
import { Role } from "@/shared/const";
import { useSelector } from "react-redux";
import type { RootState } from "./store";
// import MainLayout from "@/layout/MainLayout";

const MainLayout = lazy(() => import("@/layout/MainLayout"));
const Partner = lazy(() => import("@/features/parter/pages/Partner"));
const PartnerChild = lazy(() => import("@/features/parter/pages/PartnerChild"));
const Login = lazy(() => import("@/features/auth/pages/Login"));
const DetialPartner = lazy(
  () => import("@/features/parter/pages/DetialPartner")
);
const Products = lazy(() => import("@/features/product/pages/Products"));
const Profile = lazy(() => import("@/features/profile/pages/Profile"));

const AppRouter = () => {
  const isAuth = !!useSelector((state: RootState) => state.auth.token);
  return useRoutes([
    {
      path: "/",
      element: (
        <ProtectRoute isAuth={isAuth}>
          <MainLayout />
        </ProtectRoute>
      ),
      children: [
        {
          path: "",
          element: <Partner role={Role.customer} />,
          children: [
            {
              index: true,
              element: <PartnerChild />,
            },
            {
              path: "customer/archive",
              element: <PartnerChild />,
            },
            {
              path: "customer/disabled",
              element: <PartnerChild />,
            },
          ],
        },
        {
          path: "seller",
          element: <Partner role={Role.seller} />,
          children: [
            {
              index: true,
              element: <PartnerChild />,
            },
            {
              path: "archive",
              element: <PartnerChild />,
            },
            {
              path: "disabled",
              element: <PartnerChild />,
            },
          ],
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "product",
          element: <Products />,
        },
        {
          path: "/:partner/:id",
          element: <DetialPartner />,
        },
      ],
    },
    {
      path: "/login",
      element: (
        <GuestRoute isAuth={isAuth}>
          <Login />
        </GuestRoute>
      ),
    },
  ]);
};
export default AppRouter;
