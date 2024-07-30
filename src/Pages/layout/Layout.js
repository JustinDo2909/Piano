import React, { useState } from "react";
import { Layout, Menu, Button, Typography } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../global/Sidebar";
import Header from "../global/Header";

const LayOut = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout.Content>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default LayOut;
