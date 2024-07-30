import React, { useState } from "react";
import { Layout, Menu, Button, Typography } from "antd";
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
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        {/* <Typography.Text icon={<MenuOutlined />}>Manage</Typography.Text> */}
        <Menu.Item
          key="1"
          icon={<DashboardOutlined />}
          onClick={() => navigate("/")}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<UserOutlined />}
          onClick={() => navigate("/Customer")}
        >
          Customer
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<UserOutlined />}
          onClick={() => navigate("/Artist")}
        >
          Artist
        </Menu.Item>
        <Menu.Item
          key="5"
          icon={<FolderOutlined />}
          onClick={() => navigate("/MyAlbum")}
        >
          My Album
        </Menu.Item>
        <Menu.Item
          key="6"
          icon={<CustomerServiceOutlined />}
          onClick={() => navigate("/TypeMusic")}
        >
          Type of Music
        </Menu.Item>
        <Menu.Item
          key="7"
          icon={<EditOutlined />}
          onClick={() => navigate("/Compose")}
        >
          Compose
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};

export default Sidebar;
