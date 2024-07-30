import React from "react";
// import { HeaderSidebar, HeaderTop } from "./Home";
import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

const Customer = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* <Header style={{ background: "#001529", padding: 0 }}>
        <HeaderTop />
      </Header> */}

      <Layout>
        {/* <Sider width={200} style={{ background: "#fff" }}>
          <HeaderSidebar />
        </Sider> */}
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
            <h2>Welcome to the Manage Customer </h2>
            <p>Here you can manage your content and settings.</p>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Customer;
