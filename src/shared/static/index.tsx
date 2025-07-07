import { AppstoreAddOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";

export const SIDEBAR_DATA = [
    {
        id: 1,
        name: "Mijozlar",
        path: "/",
        icon: <UserOutlined className="text-xl" />
    },
    {
        id: 2,
        name: "Sotuvchilar",
        path: "/seller",
        icon: <UsergroupAddOutlined className="text-xl" />
    },
    {
        id: 3,
        name: "Mahsulotlar",
        path: "/product",
        icon: <AppstoreAddOutlined className="text-xl"/> 
    },
    {
        id: 4,
        name: "Profile",
        path: "/profile",
        icon: <UserOutlined className="text-xl" />
    },
]