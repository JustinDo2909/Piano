import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  Groups2Outlined,
  FolderOutlined,
  Headphones,
  DriveFileRenameOutline,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import { useSelector } from "react-redux";

const navItemsAdmin = [
  {
    text: "Home",
    icon: <HomeOutlined />,
  },
  {
    text: "Users",
    icon: <Groups2Outlined />,
  },
  {
    text: "Artist",
    icon: <Groups2Outlined />,
  },
  
 
];
const navItemsArtist = [
  {
    text: "Home",
    icon: <HomeOutlined />,
  },
  {
    text: "Users",
    icon: <Groups2Outlined />,
  },
  {
    text: "Artist",
    icon: <Groups2Outlined />,
  },
  {
    text: "MyAlbum",
    icon: <FolderOutlined />,
  },
  {
    text: "TypeOfMusic",
    icon: <Headphones />,
  },
  {
    text: "Compose",
    icon: <DriveFileRenameOutline />,
  },
 
  {
    text: "Sheet",
    icon: <DriveFileRenameOutline />,
  },
 
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.authUser.authUser);
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: "gray",
              backgroundColor: "#001529",
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="#fff"
                    textAlign="center"
                  >
                   {user.role[0] === 'Artist' ? "Artist" : "Admin"}
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft sx={{ color: "#fff" }} />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {(user.role[0] === "Artist" ? navItemsArtist : navItemsAdmin).map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText ? "#1677ff" : "transparent",
                        color:
                          active === lcText
                            ? "#fff"
                            : "rgba(255, 255, 255, 0.65)",
                        borderRadius: "10px",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "1rem",
                          color:
                            active === lcText
                              ? "#fff"
                              : "rgba(255, 255, 255, 0.65)",
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
