import React, { useState } from "react";
import {
  Menu as MenuIcon,
  SettingsOutlined,
} from "@mui/icons-material";
import FlexBetween from "../../components/FlexBetween";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../../image/logo-white.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/reducers/authSlice";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);  
  const user = useSelector((state) => state.authUser.authUser);
  const { name, token } = user;
  const dispatch = useDispatch();

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
    navigate('/login');
  };

  const handleButtonClick = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false); // Close sidebar
    }
  };

  return (
    <AppBar
      sx={{
        position: "static",
        boxShadow: "none",
        backgroundColor: "#001529",
        minHeight: "6vh",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
            handleButtonClick();
          }}>
            <MenuIcon sx={{ color: "#fff" }} />
          </IconButton>
          <img
            onClick={() => navigate("/Home")}
            src={logo}
            alt="Logo"
            style={{
              height: "35px",
              width: "120px",
              cursor: "pointer",
            }}
          />
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px", color: "#fff" }} />
          </IconButton>
         
          <Button
            onClick={handleClick}
            startIcon={<Avatar sx={{ height: "30px", width: "30px" }} />}
          />
          <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <MenuItem
              onClick={() => {
                navigate("/Profile");
                handleClose();
                handleButtonClick();
              }}
            >
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          </Menu>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
