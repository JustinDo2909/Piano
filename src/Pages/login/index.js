import React, { useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { TiSocialFacebook } from "react-icons/ti";
import { MdEast, MdWest } from "react-icons/md";
import { Box, CircularProgress, Modal, TextField, Button, Typography } from "@mui/material";
import { CheckValidCode, createNewAccount, ForgotPassword, LoginUser, loginUserGoogle, ResetPassword } from "../../util/ApiFunction";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/reducers/authSlice";
import { GoogleOutlined } from "@ant-design/icons";
import { SnackBar } from "../../components/Snackbar";

const Login = () => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [userRegister, setUserRegister] = useState({
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    name: "",
    dateOfBirth: "",
    image: "",
  });
  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [forgotPassword, setForgotPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [response, setRespone] = useState();
  const handleActiveRightPanel = () => {
    setIsActive(!isActive);
  };
  const [imageFile, setImageFile] = useState("");
    const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      type: "",
    });

  useEffect(() => {
    // Google API initialization is no longer needed if using `@react-oauth/google`
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (userRegister.password === passwordConfirm) {
        if (validate()) {
          const result = await createNewAccount(userRegister.username ,  userRegister.email ,userRegister.password ,
             userRegister.phoneNumber , userRegister.name , userRegister.dateOfBirth , imageFile);

             if (result.status < 200 || result.status >= 300) {
              setSnackbar({open: true , message: 'Register Fail ! ' , type: 'error'})
          } else {
            setIsActive(false)
            setUserRegister('');
            setConfirmPassword("");
            setSnackbar({open: true , message: 'Register success ! ' , type: 'success'})
          }
        }
      } else {
        setError("Your password confirmation does not match your password!");
      }
    } catch (error) {
      console.log(error);
      setError("Email already exists!");
    } finally {
      setLoading(false);
    }
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const handleloginArtist = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await LoginUser(userLogin);
      if (result.status === 200) {
        const userData = await result.data;
        dispatch(login(userData));
        navigate("/MyAlbum");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputRegisterChange = (e) => {
    const { name, value } = e.target;
    setUserRegister((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleInputLoginChange = (e) => {
    const { name, value } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const validate = () => {
    if (
      !userRegister.email.endsWith("@gmail.com") &&
      !userRegister.email.endsWith("@fpt.edu.vn")
    ) {
      setError("Please enter a valid email address ending with @gmail.com or @fpt.edu.vn.");
      return false;
    }

    // if (!/^(0\d{9})$/.test(userRegister.phoneNumber)) {
    //   setError("Please enter a valid phone number starting with '0' and containing 10 digits.");
    //   return false;
    // }

    if (userRegister.password.length < 5) {
      setError("Please enter a password with at least 5 characters.");
      return false;
    }

    return true;
  };

  const handleGoogleLogin = async () => {
    window.location.href = "https://api-piano-dev.amazingtech.vn/api/Auth/artist/login-google";
  };

  const handleNextStep = async () => {
    if (step === 1 && email) {
      const rep = await ForgotPassword(email)
      console.log(rep)
      if (rep.status === 200) {
        // alert("Please check your email to enter the code")
        setStep(step + 1);
      } else {
        setError("Your email is not correct")
      }
    } else if (step === 2 && code) {
      const rep = await CheckValidCode(email, code)
      if (rep.status === 200) {
        // alert("Please enter your new passowrd")
        console.log(rep.data.data.result)
        setRespone(rep.data.data.result)
        setStep(step + 1);
      } else {
        setError("Your email is not correct")
      }
    } else if (step === 3 && newPassword && newPassword === confirmPassword) {
      const rep = await ResetPassword(response, newPassword, confirmPassword)
      console.log(response)
      if (rep.status === 200) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setSuccessMessage("Your password has been successfully updated!");
          setForgotPassword(false);
          setStep(1);
          setEmail("");
          setCode("");
          setNewPassword("");
          setConfirmPassword("");
        }, 2000);

      } else {
        setError("Your password not match")
      }

    } else {
      setError("Please fill out all fields correctly.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleCloseModal = () => {
    setForgotPassword(false)
    setStep(1);
    setEmail("");
    setCode("");
    setConfirmPassword("");
    setNewPassword("");
  }

  
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

  return (
    <div className="body">
      <div className={`container ${isActive ? "right-panel-active" : ""}`}>
        <div className="form form-register">
          <form onSubmit={handleRegister}>
            <h1>Register</h1>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={userRegister.username}
              onChange={handleInputRegisterChange}
              required
              autoComplete="username"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userRegister.email}
              onChange={handleInputRegisterChange}
              required
              autoComplete="email"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userRegister.password}
              onChange={handleInputRegisterChange}
              required
              autoComplete="new-password"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              autoComplete="new-password"
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={userRegister.phoneNumber}
              onChange={handleInputRegisterChange}
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={userRegister.name}
              onChange={handleInputRegisterChange}
              required
            />
            <input
              type="date"
              name="dateOfBirth"
              placeholder="Date Of Birth"
              value={userRegister.dateOfBirth}
              onChange={handleInputRegisterChange}
              required
            />
            <input
            type="file"
            accept="image/jpeg, image/png"
            // value={user.image}
            onChange={handleImageUploadChange}
            style={{ marginTop: 16, display: "block" }}
          />  
            <button type="submit">Register</button>
            <span>or use your account</span>
            <div className="social-container">
              <a href="#" className="social">
                <TiSocialFacebook />
              </a>
            </div>
          </form>
        </div>

        <div className="form form-login">
          <form onSubmit={handleloginArtist}>
            <h1>Login here</h1>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={userLogin.username}
              onChange={handleInputLoginChange}
              required
              autoComplete="username"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userLogin.password}
              onChange={handleInputLoginChange}
              required
              autoComplete="current-password"
            />
            <div className="content">
              <div className="checkbox">
                <input type="checkbox" name="checkbox" id="checkbox" />
                <label>Remember me</label>
              </div>
              <div className="pass-link">
                <a onClick={() => setForgotPassword(true)}>Forgot password?</a>
              </div>
            </div>
            <button type="submit">Login</button>
            <span>or use your account</span>
            <div className="social-container">
              <a href="#" className="social">
                <TiSocialFacebook />
              </a>
            </div>
            <div id="signInButton">
              <button className="google-login" onClick={handleGoogleLogin}>
                <GoogleOutlined /> Google
              </button>
            </div>
          </form>
        </div>

        <div className="overlay-layout">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="title">Hello friends</h1>
              <p>If you have an account, login here and have fun</p>
              <button className="ghost" id="login" onClick={handleActiveRightPanel}>
                Login
                <i className="lni lni-arrow-left login">
                  <MdWest />
                </i>
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="title">
                Start your <br /> piano now
              </h1>
              <p>If you don't have an account yet, join us and start your journey.</p>
              <button className="ghost" id="register" onClick={handleActiveRightPanel}>
                Register
                <i className="lni lni-arrow-right register">
                  <MdEast />
                </i>
              </button>
            </div>
          </div>

        </div>

      </div>
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
                onChange={(e) => setEmail(e.target.value)}
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
    </div>
  );
};

export default Login;
