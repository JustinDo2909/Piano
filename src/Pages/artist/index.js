import React from "react";
import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";

const Artist = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Layout style={{ padding: "0 24px 24px", background: "#fff" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: "#fff",
              textAlign: "center",
            }}
          >
            <h2>Welcome to the Manage Artist </h2>
            <p>Here you can manage your content and settings.</p>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Artist;
