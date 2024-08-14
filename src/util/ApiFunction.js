import axios from "axios";
import { useSelector } from "react-redux";

export const api = axios.create({
  baseURL: "https://api-piano-dev.amazingtech.vn/api",
});

// Login
export const LoginUser = async (loginData) => {
  try {
    const response = await api.post("/Auth/login", loginData);
    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
};

// Create Account
export const createNewAccount = async (account) => {
  try {
    const response = await api.post("/Auth/artist/register", account);
    return response;
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        status: error.response.status,
        message: error.response.data?.message || "An error occurred",
      };
    } else {
      return {
        success: false,
        message: error.message || "Network error",
      };
    }
  }
};

// Get My Info
export const GetMyInfo = () => {
  const user = useSelector((state) => state.authUser.authUser);
  const { token } = user;

  const getMyInfo = async () => {
    try {
      if (token) {
        const response = await api.get("/Auth/my-info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Error during Get:", error);
      return null;
    }
  };

  return getMyInfo;
};
