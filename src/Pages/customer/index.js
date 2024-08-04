import React from "react";
// import { HeaderSidebar, HeaderTop } from "./Home";
import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

const Customer = () => {
  return (
    <Content
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
        background: "#fff",
        textAlign: "center",
      }}
    >
      <h2>Welcome to the Manage Customer </h2>
      <p>Here you can manage your content and settings.</p>
    </Content>
  );
};

export default Customer;
