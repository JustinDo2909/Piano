import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "../../components/FlexBetween";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../../image/logo-white.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/reducers/authSlice";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  //   const theme = useTheme();

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);  
  const user = useSelector((state) => state.authUser.authUser)
  const {name , token} = user;
  const dispatch = useDispatch();
  const handleLogout = () => {
      setAnchorEl(null)
     dispatch(logout())
     navigate('/login');
  }
  return (
    <AppBar
      sx={{
        position: "static",
        // background: "none",
        // height: "6vh",
        boxShadow: "none",
        backgroundColor: "#001529",
        minHeight: "6vh",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon sx={{ color: "#fff" }} />
          </IconButton>
          {/* <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween> */}
          <img
            onClick={() => navigate("/Home")}
            src={logo}
            alt="Logo"
            style={{
              height: "5vh",
              width: "auto",
              cursor: "pointer",
            }}
          />
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px", color: "#fff" }} />
          </IconButton>
          {name }
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
