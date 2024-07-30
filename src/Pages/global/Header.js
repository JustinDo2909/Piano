import React, { useState } from "react";
import { Layout, Menu, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import logo from "../../image/logo-white.png";

const Header = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  return (
    <Layout.Header
      style={{
        padding: 0,
        background: "#001529",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* <div style={{ display: "flex", alignItems: "center" }}> */}
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
          color: "white",
          alignItems: "center",
        }}
      />

      <img
        onClick={() => navigate("/")}
        src={logo}
        alt="Logo"
        style={{
          height: "50px",
          width: "auto",
          // marginLeft: 80,
          cursor: "pointer",
        }}
      />
      {/* </div> */}
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ flex: 1, justifyContent: "flex-end", display: "flex" }}
      >
        <Menu.Item
          onClick={() => navigate("/Profile")}
          key="Profile"
          icon={<UserOutlined />}
          style={{ backgroundColor: "transparent" }}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/Settings")}
          key="Settings"
          icon={<SettingOutlined />}
          style={{ backgroundColor: "transparent" }}
        >
          Settings
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
};

export default Header;
