import axios from "axios";
import { useSelector } from "react-redux";

export const api = axios.create({
  baseURL: "https://api-piano-dev.amazingtech.vn",
});

export async function getUsers(pageNum , rowsPerPage, keyword) {
  try {
    // if (keyword.length > 0 && pageNum === 0) {
    //   // Correct 'lenght' to 'length'
    //   pageNum = 1;
    // }
    const result = await api.get(
      `/api/User/all?pageNum=${pageNum}&pageSize=${rowsPerPage}&keyword=${keyword}`
    );
    return result.data;
  } catch (error) {
    console.log(`Error fetching users : ${error.message}`);
  }
}

export async function addUser(user) {
  try {
    const response = await api.post(`/api/User/add`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else return response.status;
  } catch (error) {
    console.log(`Error adding user: ${error.message}`);
  }
}

export async function deleteUserById(id) {
  try {
    const result = await api.delete(`/api/user/del/${id}`);
    return result.data;
  } catch (error) {
    console.log(`Error delete user: ${error.message}`);
  }
}

export async function updateUser(user) {
  try {
    const response = await api.put(`/api/User/update`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else return response.status;
  } catch (error) {
    console.log(`Error adding user: ${error.message}`);
  }
}

// Login
export const LoginUser = async (loginData) => {
  try {
    const response = await api.post("/api/Auth/login", loginData);
    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
};
// // Login Google
// export const LoginUserGoogle = async (token) => {
//   try {
//     const response = await api.get(`/api/Auth/artist/login-google?token=${token}`);
//     return response;
//   } catch (error) {
//     console.error("Error during login:", error);
//     return null;
//   }
// };



  export const loginUserGoogle = async (token) => {
    try {
      if (token) {
        const response = await api.get("/api/Auth/artist/login-google", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response;
      }
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
};

// Create Account
export const createNewAccount = async (account) => {
  try {
    const response = await api.post("/api/Auth/artist/register", account);
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
        const response = await api.get("/api/Auth/my-info", {
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

///ForgotPassword
export const ForgotPassword = async (email) => {
  try {
    const response = await api.post(`/api/Auth/forgot-password?email=${email}`);
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

///CheckValidCode
export const CheckValidCode = async (email, code) => {
  try {
    const response = await api.post(`/api/Auth/check-valid-code?email=${email}&code=${code}`);
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
// Reset Password
export const ResetPassword = async (token, NewPassword, ConfirmPassword) => {
  try {
    const response = await api.post(`/api/Auth/reset-password?token=${token}&NewPassword=${NewPassword}&ConfirmPassword=${ConfirmPassword}`);
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

// Update My Profile
export const UpdateProfile = async (userData) => {
  try {
    const response = await api.put("/api/User/update", userData);
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
// Add Song
export const AddSong = async (song) => {
  try {
    const response = await api.post("/api/Songs", song);
    return response;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      let errorMessage = "Unknown error occurred";

      if (data.errors) {
        errorMessage = Object.entries(data.errors)
          .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
          .join('\n');
      }

      console.error(`Error ${status}:`, errorMessage);
      
      return {
        success: false,
        status,
        message: errorMessage,
      };
    } else {
      console.error("Network error:", error.message || "Network error");
      return {
        success: false,
        message: error.message || "Network error",
      };
    }
  }
};


////Get My Songs
export const GetMySong = () => {
  const user = useSelector((state) => state.authUser.authUser);
  const { token } = user;

  const getMySong = async () => {
    try {
      if (token) {
        const response = await api.get("/api/Songs/my-song", {
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

  return getMySong;
};
////Get All Genre
export const GetAllGenre = () => {
  const user = useSelector((state) => state.authUser.authUser);
  const { token } = user;

  const getGenre = async () => {
    try {
      if (token) {
        const response = await api.get("/api/genre/get-all-genre", {
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

  return getGenre;
};


// Add Sheet Midi
export const AddSheetMidi = async (SongId, InstrumentId, TopSignature, BottomSignature, SheetFile) => {
  try {
    const formData = new FormData();
    formData.append('SongId', SongId);
    formData.append('InstrumentId', InstrumentId);
    formData.append('TopSignature', TopSignature);
    formData.append('BottomSignature', BottomSignature);
    formData.append('SheetFile', SheetFile);

    const response = await api.post('/api/Sheets/Midi', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      let errorMessage = "Unknown error occurred";

      if (data.errors) {
        errorMessage = Object.entries(data.errors)
          .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
          .join('\n');
      }

      console.error(`Error ${status}:`, errorMessage);
      
      return {
        success: false,
        status,
        message: errorMessage,
      };
    } else {
      console.error("Network error:", error.message || "Network error");
      return {
        success: false,
        message: error.message || "Network error",
      };
    }
  }
};



// Add a request interceptor
// api.interceptors.request.use(
  
//   async (config) => {
//     const user = useSelector((state) => state.authUser.authUser);
//     const { token } = user;
//     // const token = localStorage.getItem("token");
//     if (token !== null && token.length > 0) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     config.withCredentials = true;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async function (error) {
//     const originalRequest = error.config;

//     if (error.response.status === 403 && !originalRequest._retry) {
//       localStorage.clear();
//       window.location.href = "/login";
//       return Promise.reject(error);
//     }

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const resp = await refreshToken();
//         if (resp.token) {
//           const access_token = resp.token;
//           localStorage.setItem("token", access_token);
//           api.defaults.headers.common[
//             "Authorization"
//           ] = `Bearer ${access_token}`;
//           // Retry the original request with the new token
//           return api(originalRequest);
//         } else {
//           return Promise.reject(error); // Reject the promise to avoid further processing
//         }
//       } catch (refreshError) {
//         // If refreshToken() fails, redirect to login
//         window.location.href = "/login"; // Redirect to login page
//         return Promise.reject(error); // Reject the promise to avoid further processing
//       }
//     }

//     return Promise.reject(error);
//   }
// );