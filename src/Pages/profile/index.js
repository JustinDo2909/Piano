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
  const [user, setUser] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    favoriteComposer: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    setUser(users[0]);
    setEditForm({
      name: users[0].name,
      email: users[0].email,
      favoriteComposer: users[0].favoriteComposer || "",
    });
  }, []);

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
      favoriteComposer: editForm.favoriteComposer,
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
            alt={user.name}
            src={user.background}
            sx={{ width: 100, height: 100, mb: 2, mx: "auto" }}
          />
          <ProfileTitle variant="h3">{user.name}</ProfileTitle>
          <ProfileDescription>{user.email}</ProfileDescription>
          <ProfileStats>
            <ProfileStat>
              <Typography variant="body2" fontWeight="bold">
                Favorite Composer
              </Typography>
              <Typography>{user.favoriteComposer || "Unknown"}</Typography>
            </ProfileStat>
            <ProfileStat>
              <Typography variant="body2" fontWeight="bold">
                Followers
              </Typography>
              <Typography>{user.followers || 0}</Typography>
            </ProfileStat>
            <ProfileStat>
              <Typography variant="body2" fontWeight="bold">
                Following
              </Typography>
              <Typography>{user.following || 0}</Typography>
            </ProfileStat>
          </ProfileStats>
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
            width: "80%",
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
          <TextField
            label="Favorite Composer"
            name="favoriteComposer"
            value={editForm.favoriteComposer}
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
