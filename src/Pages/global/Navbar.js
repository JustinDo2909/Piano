import React, { useEffect, useState } from "react";
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
import { getMyInfo } from "../../util/ApiFunction";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const user = useSelector((state) => state.authUser.authUser)
  const dispatch = useDispatch();
  const [avatar , setAvarta] = useState('');
  const [name , setName] = useState('');


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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyInfo();
        if (data) {
          setAvarta(data.data.image)
          setName(data.data.name)
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchData();
  }, [dispatch]);


  return (
    <AppBar
      sx={{
        position: "fixed",
        boxShadow: "none",
        backgroundColor: "#001529",
        minHeight: "64px",
        width: isSidebarOpen ? "calc(100% - 200px)" : "100%",
        transition: "width 0.3s ease",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",

        }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
            handleButtonClick();
          }}>
            <MenuIcon sx={{ color: "#fff" }} />
          </IconButton>
          <img
            onClick={() => navigate("/home")}
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
          <Typography
            sx={{
              fontSize: "12px",
              maxWidth: "200px",
              textOverflow: "ellipsis",
              userSelect: "none"
            }}>
            {name}
          </Typography>

          <Button
            onClick={handleClick}
            startIcon={<Avatar src={avatar} sx={{ height: "30px", width: "30px" }} />}
            sx={{
              '& .MuiButton-startIcon': {
                marginRight: 0,
                marginLeft: 0,
              },
            }}
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
