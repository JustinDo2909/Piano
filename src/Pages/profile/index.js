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
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import backGround from "../../image/3766921.jpg";
import {
  CheckValidCode,
  ForgotPassword,
  ResetPassword,
  UpdateProfile,
  getMyInfo,
} from "../../util/ApiFunction";
import { useDispatch, useSelector } from "react-redux";
import { info, logout } from "../../Redux/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import bgProfile from "../../image/pianoSlider.jpg"
import { SnackBar } from "../../components/Snackbar";
// Styled components
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
  width: "640px",
  height: "460px",
  borderRadius: "20px",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  backgroundColor: "#f9f9f9",
  position: "relative",
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
  display: "block",
  position: "absolute",
  width: "100%",
  top: "25%",
  boxSizing: "border-box"
}));

const ModalContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "500px",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
}));

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [response, setRespone] = useState();
  const userData = useSelector((state) => state.authUser.authUser);
  const [email, setEmail] = useState(userData.data.email);
  const [imageFile, setImageFile] = useState("");
  const [review, setReview] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });
  const [user , setUser] = useState('');

  const formatDate = (dateString) => {
    if (!dateString) return ""; // Handle empty or undefined date
    const [month, day, year] = dateString.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const [editForm, setEditForm] = useState({
    id: userData.data.id,
    userName: userData.data.userName,
    name: userData.data.name,
    email: userData.data.email,
    phoneNumber: userData.data.phoneNumber,
    dateOfBirth: userData.data.dateOfBirth ? formatDate(userData.data.dateOfBirth) : '',
    Image : imageFile
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyInfo();
        if (data) {
          dispatch(info(data));
          setUser(data.data)
          console.log(data.data.image)
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchData();
  }, [dispatch , snackbar]);

  useEffect(() => {
    if (user.image) {
      setReview(user.image);
    }
  }, [snackbar, user]);


  const handleEditClick = () => setIsEditModalOpen(true);
  const handlePasswordClick = () => setForgotPassword(true);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    const finalImageFile = review;
    console.log(review)
    try {
      const result = await UpdateProfile(
        editForm.id, 
        editForm.userName,  
        editForm.email, 
        editForm.phoneNumber,
        editForm.name,
        editForm.dateOfBirth,
        imageFile
      );
  
      if (result.status === 200) {
        window.location.reload();
        const updatedUserData = result.data;
        dispatch(info(updatedUserData.data));
        setIsEditModalOpen(false);
        setSnackbar({ open: true, message: 'Change success!', type: 'success' });
      } else {
        setSnackbar({ open: true, message: 'Update failed!', type: 'error' });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setSnackbar({ open: true, message: 'An error occurred while updating your profile!', type: 'error' });
    }
  };
  

  const handleNextStep = async () => {
    try {
      if (step === 1 && email) {
        const rep = await ForgotPassword(email);
        if (rep.status === 200) {
          // alert("Please check your email to enter the code");
          setStep(step + 1);
        } else {
          setError("Your email is not correct");
        }
      } else if (step === 2 && code) {
        const rep = await CheckValidCode(email, code);
        if (rep.status === 200) {
          // alert("Please enter your new password");
          setRespone(rep.data.data.result);
          setStep(step + 1);
        } else {
          setError("Invalid verification code");
        }
      } else if (step === 3 && newPassword && newPassword === confirmPassword) {
        setLoading(true);
        const rep = await ResetPassword(response, newPassword, confirmPassword);
        if (rep.status === 200) {
          setSuccessMessage("Your password has been successfully updated!");
          setForgotPassword(false);
          setStep(1);
          setEmail("");
          setCode("");
          setNewPassword("");
          setConfirmPassword("");
          dispatch(logout());
          navigate('/login');
          setSnackbar({open: true , message: 'Register success ! ' , type: 'success'})
        } else {
          setSnackbar({open: true , message: 'Your passwords do not match ! ' , type: 'erorr'})
        }
        setLoading(false);
      } else {
        setSnackbar({open: true , message: 'Please fill out all fields correctly ! ' , type: 'erorr'})
        setTimeout(() => setError(""), 3000);
      }
    } catch (error) {
      setSnackbar({open: true , message: 'An error occurred during the password reset process. ! ' , type: 'erorr'})
      setError("An error occurred during the password reset process.");
    }
  };


  const handleCloseModal = () => {
    setForgotPassword(false);
    setStep(1);
    setEmail("");
    setCode("");
    setConfirmPassword("");
    setNewPassword("");
  };

  const handleImageUploadChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setImageFile(file)

    } else {
      setSnackbar({ open: true, message: 'You can only upload JPEG or PNG images!', type: 'error' });
    }
  };
  

  if (loading) {
    return (
      <Box mt={20} mb={38} textAlign={"center"}>
        <CircularProgress size={50} color="primary" />
        <Box mt={2}>
          <h3>LOADING. . .</h3>
        </Box>
      </Box>
    );
  }

  const getTextFieldStyle = () => ({
    mb: 2,
    '& .MuiInputBase-input': {
      fontSize: '14px',
    },
    '& .MuiOutlinedInput-input': {
      padding: '12px',
    },
  });

  return (
    <BackgroundContainer>
      <ProfileCard>
        <CardMedia
          component="img"
          alt="Background"
          height="180"
          image={bgProfile}
          sx={{ objectFit: "cover", filter: "grayscale(50%)" }}
        />
        <ProfileInfo>
          <Avatar 
            alt={userData.data.name}
            src={user.image}
            sx={{ width: 100, height: 100, mb: 2, mx: "auto", border: "2px solid black" }}
          />
          <ProfileTitle>{user.name}</ProfileTitle>
          <ProfileDescription>{user.email}</ProfileDescription>
          <ProfileDescription>{user.phoneNumber}</ProfileDescription>
          <ProfileDescription>{user.dateOfBirth}</ProfileDescription>
          <Button
            variant="contained"
            onClick={handleEditClick}
            sx={{
              mt: 2, ml: 2,
              bgcolor: "#211f65",
              color: "#eee",
              "&:hover": {
                backgroundColor: "#0f0e38",
                color: "#fff",
              },
            }}>
            Edit Info
          </Button>
          <Button
            variant="outlined"
            onClick={handlePasswordClick}
            sx={{
              mt: 2, ml: 2,
              border: "1px solid black",
              bgcolor: "inherit",
              color: "#211f65",
              "&:hover": {
                borderColor: "#0f0e38",
              }
            }}
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
            p: 2,
            boxSizing: "border-box"
          }}
        >
          <Typography id="edit-info-modal-title" variant="h4" fontFamily="Roboto" mb="10px" gutterBottom>
            Edit User Information
          </Typography>
          <form onSubmit={handleSaveEdit}>

            <TextField
              label="Name"
              name="name"
              value={editForm.name}
              onChange={handleEditChange}
              fullWidth
              variant="outlined"
              sx={getTextFieldStyle()}
            />


            <TextField
              label="Email"
              name="email"
              value={editForm.email}
              onChange={handleEditChange}
              fullWidth
              variant="outlined"
              sx={getTextFieldStyle()}
            />


            <TextField
              label="Phone"
              name="phoneNumber"
              value={editForm.phoneNumber}
              onChange={handleEditChange}
              fullWidth
              variant="outlined"
              sx={getTextFieldStyle()}
            />


            <TextField
              type="date"
              name="dateOfBirth"
              value={editForm.dateOfBirth}
              onChange={handleEditChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={getTextFieldStyle()}
            />
             <input
            type="file"
            accept="image/jpeg, image/png"
            // value={user.image}
            onChange={handleImageUploadChange}
            style={{ marginTop: 16, display: "block" }}
          />  
          {review && (
            <CardMedia
            component="img"
            height="140"
            image={imageFile ? URL.createObjectURL(imageFile) : review}
            alt="profile image"
          />
          )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 2,
                bgcolor: "#211f65",
                color: "#eee",
                "&:hover": {
                  backgroundColor: "#0f0e38",
                  color: "#fff",
                },
              }}
            >
              Save
            </Button>
          </form>
        </Box>
      </Modal>

      {/* Forgot Password Modal */}
      {forgotPassword && (
        <Modal
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(3px)',
          }}
          open={forgotPassword}
          onClose={handleCloseModal}
        >
          <Box
            p={4}
            bgcolor="background.paper"
            borderRadius={2}
            boxShadow={3}
            maxWidth="400px"
            width="90%"
            textAlign="center"
          >
            <Typography variant="h4" fontWeight={'700'} gutterBottom>
              {step === 1 && "Forgot Password"}
              {step === 2 && "Verify Your Email"}
              {step === 3 && "Reset Your Password"}
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={2}>
              {step === 1 && "Enter your email address to receive a password reset link."}
              {step === 2 && "Enter the verification code sent to your email."}
              {step === 3 && "Create a new password to access your account."}
            </Typography>
            {step === 1 && (
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                value={email}
                margin="dense"
              />
            )}
            {step === 2 && (
              <TextField
                fullWidth
                label="Verification Code"
                variant="outlined"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                margin="dense"
              />
            )}
            {step === 3 && (
              <>
                <TextField
                  fullWidth
                  label="New Password"
                  variant="outlined"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  margin="dense"
                />
                <TextField
                  fullWidth
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  margin="dense"
                  mt={2}
                />
              </>
            )}
            {error && (
              <Typography color="error" mt={2}>
                {error}
              </Typography>
            )}
            {successMessage && (
              <Typography color="primary" mt={2}>
                {successMessage}
              </Typography>
            )}
            <Box mt={3}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleNextStep}
              >
                {step === 3 ? "Update Password" : "Next"}
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
       <SnackBar
          open={snackbar.open}
          type={snackbar.type}
          message={snackbar.message}
          handleClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        />
    </BackgroundContainer>
  );
};

export default Profile;
