// import React, { useState } from "react";
// import { Layout, Menu, Button, Typography, Dropdown } from "antd";
// import { useNavigate } from "react-router-dom";
// import {
//   UserOutlined,
//   SettingOutlined,
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   DownOutlined,
// } from "@ant-design/icons";
// import logo from "../../image/logo-white.png";

// const { Item: MenuItem } = Menu;

// const settingsMenu = (
//   <Menu>
//     <MenuItem
//       key="change-password"
//       onClick={() => console.log("Change Password")}
//     >
//       Change Password
//     </MenuItem>
//     <MenuItem
//       key="update-account"
//       onClick={() => console.log("Update Account")}
//     >
//       Update Account
//     </MenuItem>
//     <MenuItem key="logout" onClick={() => console.log("Logout")}>
//       Logout
//     </MenuItem>
//   </Menu>
// );

// const Header = ({ collapsed, setCollapsed }) => {
//   const navigate = useNavigate();

//   const menuItems = [
//     {
//       key: "Profile",
//       icon: <UserOutlined />,
//       label: "Profile",
//       onClick: () => navigate("/Profile"),
//     },
//     {
//       key: "Settings",
//       icon: <SettingOutlined />,
//       label: "Settings",
//       onClick: () => navigate("/Settings"),
//     },
//   ];

//   return (
//     <Layout.Header
//       style={{
//         padding: 0,
//         background: "#001529",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//       }}
//     >
//       <Button
//         type="text"
//         icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//         onClick={() => setCollapsed(!collapsed)}
//         style={{
//           fontSize: "16px",
//           width: 64,
//           height: 64,
//           color: "white",
//         }}
//       />
//       <img
//         onClick={() => navigate("/")}
//         src={logo}
//         alt="Logo"
//         style={{
//           height: "50px",
//           width: "auto",
//           cursor: "pointer",
//         }}
//       />
//       <Menu
//         theme="dark"
//         mode="horizontal"
//         items={menuItems}
//         style={{ flex: 1, justifyContent: "flex-end", display: "flex" }}
//       >
//         <Menu.Item
//           onClick={() => navigate("/Profile")}
//           key="Profile"
//           icon={<UserOutlined />}
//           style={{ backgroundColor: "transparent" }}
//         >
//           Profile
//         </Menu.Item>

//         <Dropdown overlay={settingsMenu} trigger={["click"]}>
//           <Menu.Item
//             key="Settings"
//             icon={<SettingOutlined />}
//             style={{
//               backgroundColor: "transparent",
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             Settings <DownOutlined />
//           </Menu.Item>
//         </Dropdown>
//       </Menu>
//     </Layout.Header>
//   );
// };

// export default Header;

import React, { useState } from "react";
import { Layout, Menu, Button, Typography, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
} from "@ant-design/icons";
import logo from "../../image/logo-white.png";

const { Item: MenuItem } = Menu;

const settingsMenu = (
  <Menu>
    <MenuItem
      key="change-password"
      onClick={() => console.log("Change Password")}
    >
      Change Password
    </MenuItem>
    <MenuItem
      key="update-account"
      onClick={() => console.log("Update Account")}
    >
      Update Account
    </MenuItem>
    <MenuItem key="logout" onClick={() => console.log("Logout")}>
      Logout
    </MenuItem>
  </Menu>
);

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
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
          color: "white",
        }}
      />

      <img
        onClick={() => navigate("/")}
        src={logo}
        alt="Logo"
        style={{
          height: "50px",
          width: "auto",
          cursor: "pointer",
        }}
      />

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

        <Dropdown overlay={settingsMenu} trigger={["click"]}>
          <Menu.Item
            key="Settings"
            icon={<SettingOutlined />}
            style={{
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "center",
            }}
          >
            Settings <DownOutlined />
          </Menu.Item>
        </Dropdown>
      </Menu>
    </Layout.Header>
  );
};

export default Header;
