import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { TiSocialFacebook } from "react-icons/ti";
import { MdEast, MdWest } from "react-icons/md";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleloginAdmin = async (e) => {
    // e.preventDefault();
    // const result = await loginUser(username, password);
    // if (result.success) {
    //     navigate("/");
    // } else {
    //     alert(result.message);
    // }
  };

  return (
    <div className="body">
      <div className="container">
        <div className="form form-login">
          <form onSubmit={handleloginAdmin}>
            <h1>Login here</h1>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button>Login</button>
          </form>
        </div>

        <div className="overlay-layout">
          <div class="overlay ">
            <div class="overlay-panel overlay-right">
              <h1 class="title">Access the Admin Dashboard</h1>
              <p>Access Your Website Management Tools By Admin Role</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
