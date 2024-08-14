import React, { useEffect, useState } from "react";
import {
  Avatar,
  Typography,
  Card,
  CardMedia,
  Box,
  Button,
  Modal,
  TextField,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import users from "../../Data/User.json";
import backGround from "../../image/3766921.jpg";
import { GetMyInfo } from "../../util/ApiFunction";
import { useDispatch, useSelector } from "react-redux";
import { info } from "../../Redux/reducers/authSlice";


const BackgroundContainer = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${backGround})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  minHeight: "92vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  width: "500px",
  borderRadius: "20px",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  backgroundColor: "#f9f9f9",
}));

const ProfileTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  color: "#333",
  fontSize: "22px",
  margin: "10px 0",
  fontWeight: 600,
}));

const ProfileDescription = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#666",
  margin: 0,
}));

const ProfileInfo = styled(Box)(({ theme }) => ({
  padding: "20px",
  textAlign: "center",
}));

const ProfileStats = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  marginTop: "15px",
}));

const ProfileStat = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  fontSize: "14px",
  color: "#333",
}));

const Profile = () => {
const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const userData = useSelector((state) => state.authUser.authUser);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    setEditForm({
      name: userData.name,
      email: userData.email,
    });
  }, []);
  const getMyInfo = GetMyInfo();
  useEffect(() => {
    const getCustomer = async () => {
      const data = await getMyInfo();
      if (data !== null) {
       dispatch(info(data))
       console.log(userData.role)
       console.log(data.data)
      }
      console.log('cut')
    };
    getCustomer();
  },[])
  

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handlePasswordClick = () => {
    setIsPasswordModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    });
  };

  const handleSaveEdit = () => {
    setUser({
      ...user,
      name: editForm.name,
      email: editForm.email,
    });
    setIsEditModalOpen(false);
  };

  const handleSavePassword = () => {
    setIsPasswordModalOpen(false);
  };

  return (
    <BackgroundContainer>
      <ProfileCard>
        <CardMedia
          component="img"
          alt="Background"
          height="180"
          image={user.background}
          sx={{ objectFit: "cover", filter: "grayscale(50%)" }}
        />
        <ProfileInfo>
          <Avatar
            alt={userData.name}
            src={user.background}
            sx={{ width: 100, height: 100, mb: 2, mx: "auto" }}
          />
          <ProfileTitle variant="h3">{userData.name}</ProfileTitle>
          <ProfileDescription>{userData.email}</ProfileDescription>
         
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditClick}
            sx={{ mt: 2 }}
          >
            Edit Info
          </Button>
          <Button
            variant="outlined"
            color="info"
            onClick={handlePasswordClick}
            sx={{ mt: 2, ml: 2 }}
          >
            Change Password
          </Button>
        </ProfileInfo>
      </ProfileCard>

      {/* Edit Info Modal */}
      <Modal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        aria-labelledby="edit-info-modal-title"
        aria-describedby="edit-info-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "20%",
            maxWidth: 600,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="edit-info-modal-title" variant="h6" component="h2">
            Edit User Information
          </Typography>
          <TextField
            label="Name"
            name="name"
            value={editForm.name}
            onChange={handleEditChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            name="email"
            value={editForm.email}
            onChange={handleEditChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveEdit}
            sx={{ mt: 2 }}
          >
            Save
          </Button>
        </Box>
      </Modal>

      <Modal
        open={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        aria-labelledby="change-password-modal-title"
        aria-describedby="change-password-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: 600,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="change-password-modal-title"
            variant="h6"
            component="h2"
          >
            Change Password
          </Typography>
          <TextField
            label="Current Password"
            name="currentPassword"
            type="password"
            value={passwordForm.currentPassword}
            onChange={handlePasswordChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="New Password"
            name="newPassword"
            type="password"
            value={passwordForm.newPassword}
            onChange={handlePasswordChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSavePassword}
            sx={{ mt: 2 }}
          >
            Change Password
          </Button>
        </Box>
      </Modal>
    </BackgroundContainer>
  );
};

export default Profile;
