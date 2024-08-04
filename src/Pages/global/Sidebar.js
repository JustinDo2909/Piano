import React from "react";
import { Layout, Menu, Typography } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  FolderOutlined,
  CustomerServiceOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/"),
    },
    {
      key: "3",
      icon: <UserOutlined />,
      label: "Customer",
      onClick: () => navigate("/Customer"),
    },
    {
      key: "4",
      icon: <UserOutlined />,
      label: "Artist",
      onClick: () => navigate("/Artist"),
    },
    {
      key: "5",
      icon: <FolderOutlined />,
      label: "My Album",
      onClick: () => navigate("/MyAlbum"),
    },
    {
      key: "6",
      icon: <CustomerServiceOutlined />,
      label: "Type of Music",
      onClick: () => navigate("/TypeMusic"),
    },
    {
      key: "7",
      icon: <EditOutlined />,
      label: "Compose",
      onClick: () => navigate("/Compose"),
    },
  ];

  return (
    <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
      {!collapsed && (
        <Typography.Title
          level={2}
          style={{ color: "white", textAlign: "center" }}
        >
          Admin
        </Typography.Title>
      )}
      <Menu
        theme="dark"
        mode="inline"
        items={menuItems}
        defaultSelectedKeys={["1"]}
      />
    </Layout.Sider>
  );
};

export default Sidebar;
