import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  TextField,
  Box,
  Modal,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";

const UsersModal = ({
  isModalVisible,
  handleCloseModal,
  isEditMode,
  currentUser,
  handleSaveUser,
  handleChange,
}) => {
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (isEditMode && currentUser?.image) {
      setImagePreview(currentUser.image);
    }
  }, [isEditMode, currentUser]);

  const validate = () => {
    let tempErrors = {};
    if (!currentUser.userName) tempErrors.userName = "User Name is required";
    if (!currentUser.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(currentUser.email))
      tempErrors.email = "Email is not valid";
    if (!currentUser.passwordHash && !isEditMode)
      tempErrors.passwordHash = "Password is required";
    if (!currentUser.phoneNumber)
      tempErrors.phoneNumber = "Phone Number is required";
    else if (!/^\d{10}$/.test(currentUser.phoneNumber))
      tempErrors.phoneNumber = "Phone Number must be 10 digits";
    if (!currentUser.name) tempErrors.name = "Name is required";
    if (!currentUser.dateOfBirth)
      tempErrors.dateOfBirth = "Date of Birth is required";
    if (!currentUser.role) tempErrors.role = "Role is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      handleChange({
        target: {
          name: "image",
          value: file,
        },
      });
    }
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
      handleSaveUser(event);
 };

  const resetForm = () => {
    setImagePreview("");
    setErrors({});
    handleCloseModal();
  };

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
    <Modal
      open={isModalVisible}
      onClose={resetForm}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
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
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h4" fontFamily="Roboto" mb="5px" gutterBottom>
          {isEditMode ? "Edit User" : "Add New User"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="User Name"
            name="userName"
            value={currentUser?.userName || ""}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.userName}
            helperText={errors.userName}
            sx={getTextFieldStyle()}
          />

          <TextField
            label="Email"
            name="email"
            value={currentUser?.email || ""}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.email}
            helperText={errors.email}
            sx={getTextFieldStyle()}
          />

          <TextField
            label={
              isEditMode
                ? "Password (Leave blank if you don't want to change it)"
                : "Password"
            }
            name="passwordHash"
            type="password"
            value={currentUser?.passwordHash || ""}
            onChange={handleChange}
            fullWidth
            error={!!errors.passwordHash}
            helperText={errors.passwordHash}
            sx={getTextFieldStyle()}
          />

          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={currentUser?.phoneNumber || ""}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
            sx={getTextFieldStyle()}
          />

          <TextField
            label="Name"
            name="name"
            value={currentUser?.name || ""}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.name}
            helperText={errors.name}
            sx={getTextFieldStyle()}
          />

          <TextField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={currentUser?.dateOfBirth || ""}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            error={!!errors.dateOfBirth}
            helperText={errors.dateOfBirth}
            sx={getTextFieldStyle()}
          />

          {!isEditMode && (
            <Box>
              <FormLabel component="legend" sx={{ fontSize: "14px" }}>
                Role:
              </FormLabel>
              <RadioGroup
                name="role"
                value={currentUser?.role || ""}
                onChange={handleChange}
              >
                <Box>
                  <FormControlLabel
                    value="Admin"
                    control={<Radio />}
                    label="Admin"
                  />
                  <FormControlLabel
                    value="Player"
                    control={<Radio />}
                    label="Player"
                  />
                  <FormControlLabel
                    value="Artist"
                    control={<Radio />}
                    label="Artist"
                  />
                </Box>
              </RadioGroup>
              {errors.role && (
                <Typography color="error" variant="caption">
                  {errors.role}
                </Typography>
              )}
            </Box>
          )}

          <Box>
            <FormLabel component="legend">Upload Image</FormLabel>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "block", marginBottom: 8 }}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Selected"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  marginBottom: 8,
                  textAlign: "center",
                }}
              />
            )}
          </Box>

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
            {isEditMode ? "Update User" : "Add User"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default UsersModal;
