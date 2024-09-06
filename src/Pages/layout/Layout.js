import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../global/Navbar";
import Sidebar from "../global/Sidebar";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navbarHeight = 64;

  return (
    <Box
      display={isNonMobile ? "flex" : "block"}
      width="100%"
      height="auto"
      p="0px"
      bgcolor="#ddd"
      boxSizing="border-box"
      sx={{
        overflowX: "hidden",
        overflowY: "scroll"
      }}
    >
      <Sidebar
        isNonMobile={isNonMobile}
        drawerWidth="200px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box
        flexGrow={1}
        sx={{
          paddingTop: `${navbarHeight}px`,
        }}
      >
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
