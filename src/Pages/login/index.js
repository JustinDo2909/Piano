import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
// import { loginUser } from "../../Api/ApiFunctions";
import { TiSocialFacebook } from "react-icons/ti";
import { MdEast, MdWest } from "react-icons/md";
import { Box, CircularProgress } from "@mui/material";
import { createNewAccount, LoginUser } from "../../util/ApiFunction";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/reducers/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userRegister, setUserRegister] = useState({
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
    name: '',
    dateOfBirth: '',
    image: ''
  });
  const [userLogin , setUserLogin] = useState({
    username: '',
    password : ''
  })

  const handleActiveRightPanel = () => {
    setIsActive(!isActive);
  };

  ///////////////////////////handle logic///////////////////////
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (userRegister.password === passwordConfirm) {
        const result = await createNewAccount(userRegister);
        if (result.status < 200 || result.status >= 300) {
          setError("Email already exists!");
        } else {
          setTimeout(() => {
            navigate("/login");
          }, 10000);
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

  const handleAdminLogin = async(e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const result = await LoginUser(userLogin)
      if(result.status === 200) {
        dispatch(login(userLogin))
        console.log(result.data)
        // navigate("/Home");
      }
      return;
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  };

  const handleloginArtist = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const result = await LoginUser(userLogin)
      if(result.status === 200) {
        const userData = await result.data;
        dispatch(login(userData))
        navigate("/Home");
      }
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  };

  ////////////////////////
  const handleInputRegisterChange = (e) => {
    const { name, value } = e.target;
    setUserRegister({ ...userRegister, [name]: value });
  };
  const handleInputLoginChange = (e) => {
    const { name, value } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const validate = () => {
    // Validate email format
    if (!userRegister.email.endsWith('@gmail.com') && !userRegister.email.endsWith('@fpt.edu.vn')) {
      setError("Please enter a valid email address ending with @gmail.com or @fpt.edu.vn.");
      return false;
    }

    // Validate phone number format
    if (!/^(0\d{9})$/.test(userRegister.phoneNumber)) {
      setError("Please enter a valid phone number starting with '0' and containing 10 digits.");
      return false;
    }
    if (userRegister.password.length < 5) {
      setError("Please enter a password with at least 5 characters.");
      return false;
    }

    return true;
  };

  if (loading) {
    return (
      <Box mt={20} mb={38} textAlign={'center'}>
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
          <form action="#">
            <h1>Register</h1>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={userRegister.username}
              onChange={handleInputRegisterChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userRegister.email}
              onChange={handleInputRegisterChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userRegister.password}
              onChange={handleInputRegisterChange}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
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
              type="text"
              name="image"
              placeholder="Image"
              value={userRegister.image}
              onChange={handleInputRegisterChange}
              required
            />
            <button onClick={handleRegister}>Register</button>
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
              name= 'username'
              placeholder="Username"
              value={userLogin.username}
              onChange={handleInputLoginChange}
              required
            />
            <input
              type="password"
              name= 'password'
              placeholder="Password"
              value={userLogin.password}
              onChange={handleInputLoginChange}
              required
            />
            <div className="content">
              <div className="checkbox">
                <input type="checkbox" name="checkbox" id="checkbox" />
                <label>Remember me</label>
              </div>
              <div className="pass-link">
                <a href="#">Forgot password?</a>
              </div>
            </div>
            <button>Login</button>
            <span>or use your account</span>
            <div className="social-container">
              <a href="#" className="social">
                <TiSocialFacebook />
              </a>
            </div>
            <a href="#" onClick={handleAdminLogin}>
              Login with Admin role
            </a>
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
              <p>
                If you don't have an account yet, join us and start your journey.
              </p>
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
    </div>
  );
};

export default Login;
