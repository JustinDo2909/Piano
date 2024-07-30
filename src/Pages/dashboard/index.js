import React, { useState } from "react";
import { Layout } from "antd";

const { Content } = Layout;

const Home = () => {
  return (
    <Content>
      <h2>Welcome to the Admin Dashboard</h2>
      <p>Here you can manage your content and settings.</p>
    </Content>
  );
};

export default Home;
