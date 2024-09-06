import axios from "axios";
import { useSelector } from "react-redux";
import store from "../Redux/store";
import { logout } from "../Redux/reducers/authSlice";

export const api = axios.create({
  baseURL: "https://api-piano-dev.amazingtech.vn",
});

export async function getUsers(pageNum, rowsPerPage, keyword) {
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

export async function addUser(UserName,Email ,PasswordHash,PhoneNumber,Name,DateOfBirth,Role,image) {
  try {
    const formData = new FormData();
    formData.append('UserName',UserName );
    formData.append('Email',Email );
    formData.append('PasswordHash',PasswordHash );
    formData.append('PhoneNumber',PhoneNumber );
    formData.append('Name',Name );
    formData.append('DateOfBirth',DateOfBirth );
    formData.append('Role',Role  );
    formData.append('Image',image);

    const response = await api.post('/api/User/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  } catch (error) {
   console.log(error)
};
}

export async function deleteUserById(id) {
  try {
    const result = await api.delete(`/api/user/del/${id}`);
    return result.data;
  } catch (error) {
    console.log(`Error delete user: ${error.message}`);
  }
}

export async function updateUser(Id , UserName ,Email, PhoneNumber, Name, DateOfBirth, image) {
  try {
    const formData = new FormData();
    formData.append('Id', Id);
    formData.append('UserName ', UserName );
    formData.append('Email ', Email );
    formData.append('PhoneNumber ', PhoneNumber );
    formData.append('Name ', Name );
    formData.append('DateOfBirth ', DateOfBirth );
    formData.append('ImageFile', image);

    const response = await api.put('/api/User/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  } catch (error) {
   console.log(error)
};
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
export const createNewAccount = async (UserName ,Email,Password , PhoneNumber, Name, DateOfBirth, image) => {
  try {
    const formData = new FormData();
    formData.append('UserName',UserName);
    formData.append('Email',Email );
    formData.append('Password',Password);
    formData.append('PhoneNumber', PhoneNumber);
    formData.append('Name',Name);
    formData.append('DateOfBirth',DateOfBirth);
    formData.append('Image',image);

    const response = await api.post('/api/Auth/artist/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  } catch (error) {
   console.log(error)
};
};

//================================================== Get My Info ============================================ //
export async function getMyInfo() {
  try {
    const response = await api.get("/api/Auth/my-info");
    return response.data;
  } catch (error) {
    console.error("Error during get info:", error);
  }
}

// ===================================== Aritists ===================================== //

export async function getAllArtist(pageNum, rowsPerPage, keyword) {
  try {
    const result = await api.get(
      `/api/Songs/all?pageNum=${pageNum}&pageSize=${rowsPerPage}&keyword=${keyword}`
    );
    return result.data;
  } catch (error) {
    console.log(`Error fetching users : ${error.message}`);
  }
}

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
export const UpdateProfile = async (Id, UserName, Email, PhoneNumber, Name, DateOfBirth, Image) => {
  try {
    const formData = new FormData();
    formData.append('Id',Id);
    formData.append('UserName',UserName);  
    formData.append('Email', Email);        
    formData.append('PhoneNumber',PhoneNumber);  
    formData.append('Name',Name); 
    formData.append('DateOfBirth',DateOfBirth);  
    formData.append('Image',Image); 

    const response = await api.put('/api/User/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }); 

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
export const AddSong = async (title, composer, genreId, artistId, image) => {
  try {
    const formData = new FormData();
    formData.append('Title', title);
    formData.append('Composer', composer);
    formData.append('GenreId', genreId);
    formData.append('ArtistId', artistId);
    formData.append('ImageFile', image);

    const response = await api.post('/api/Songs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  } catch (error) {
   console.log(error)
};
}

//update Songs
export const UpdateSong = async (Id,title, composer, genreId, artistId, image) => {
  try {
    const formData = new FormData();
    formData.append('Id', Id);
    formData.append('Title', title);
    formData.append('Composer', composer);
    formData.append('GenreId', genreId);
    formData.append('ArtistId', artistId);
    formData.append('ImageFile', image);

    const response = await api.put('/api/Songs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  } catch (error) {
   console.log(error)
};
}

//Delete Songs
export const DeleteSong = async (songId) => {
  try {
    const response = await api.delete(`/api/Songs/${songId}`);
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

// ============================== Songs ==================================== //
export async function getMySong() {
  try {
    const response = await api.get("/api/Songs/my-song");
    return response.data;
  } catch (error) {
    console.error("Error during Get:", error);
    return null;
  }
}

export async function updateSong(song) {
  const data = {
    id: song?.id,
    title: song?.title,
    genreId: 0,
    composer: song?.composer,
    artistId: song?.artistId,
    image: song?.image,
  };
  console.log(data);
  try {
    const response = await api.put(`/api/Songs/`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else return response.status;
  } catch (error) {
    console.log(`Error updating song: ${error.message}`);
  }
}

export async function addSong(song) {
  const data = {
    title: song?.title,
    genreId: 0,
    composer: song?.composer,
    artistId: song?.artistId,
    image: song?.image,
  };
  console.log(data);
  try {
    const response = await api.post(`/api/Songs/`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else return response.status;
  } catch (error) {
    console.log(`Error updating song: ${error.message}`);
  }
}

export async function deleteSongById(id) {
  try {
    const result = await api.delete(`/api/Songs/${id}`);
    return result.data;
  } catch (error) {
    console.log(`Error delete song: ${error.message}`);
  }
}

// Add Sheet Midi
export const AddMxlFile = async (
  SongId,
  InstrumentId,
  Name,
  Level,
  KeySignature,
  TopSignature,
  BottomSignature,
  MxlFile,
  ImageFile
) => {
  try {
    const formData = new FormData();
    formData.append("SongId", SongId);
    formData.append("InstrumentId", InstrumentId);
    formData.append("Name", Name);
    formData.append("Level", Level);
    formData.append("KeySignature", KeySignature);
    formData.append("TopSignature", TopSignature);
    formData.append("BottomSignature", BottomSignature);
    formData.append("XmlFile", MxlFile);
    formData.append("BackgroundMusic", ImageFile);

    const response = await api.post("/api/Sheets/Xml", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      let errorMessage = "Unknown error occurred";

      if (data.errorList || data.errorMap) {
        errorMessage = {
          errorList: data.errorList || [],
          errorMap: data.errorMap || {},
        };
      } else if (data.errors) {
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

//Add Sheet Symbol 
export const AddSheetSymbol = async(
  SongId,
  InstrumentId,
  Name,
  Level,
  KeySignature,
  TopSignature,
  BottomSignature,
  RightSymbol,
  LeftSymbol,
  XmlFile,
  ImageFile
) => {
  try {
    const formData = new FormData();
    formData.append("SongId", SongId);
    formData.append("InstrumentId", InstrumentId);
    formData.append("Name", Name);
    formData.append("Level", Level);
    formData.append("KeySignature", KeySignature);
    formData.append("TopSignature", TopSignature);
    formData.append("BottomSignature", BottomSignature);
    formData.append("RightSymbol", RightSymbol);
    formData.append("LeftSymbol", LeftSymbol);
    formData.append("XmlFile", XmlFile);
    formData.append("BackgroundMusic", ImageFile);

    const response = await api.post("/api/Sheets/Xml", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      let errorMessage = "Unknown error occurred";

      if (data.errorList || data.errorMap) {
        errorMessage = {
          errorList: data.errorList || [],
          errorMap: data.errorMap || {},
        };
      } else if (data.errors) {
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

///Get Sheet bY sONG ID
export const getSheetById = async (songId) => {
  try {
    const response = await api.get(`/api/Sheets/Song/${songId}`);
    return response.data;
  } catch (error) {
    console.error(`Error creating Genre: ${error.message}`);
    return null;
  }
};
///Delete Sheet bY Sheet ID
export const deleteSheetById = async (SheetID) => {
  try {
    const response = await api.delete(`/api/Sheets/${SheetID}`);
    return response.data;
  } catch (error) {
    console.error(`Error creating Genre: ${error.message}`);
    return null;
  }
};


export const getInstrument = async () => {
  try {
    const result = await api.get(`api/Instrument/get-all-instrument`);
    return result.data;
  } catch (error) {
    console.error(`Error fetching instruments: ${error.message}`);
  }
};

export const createInstrument = async (instrument) => {
  try {
    const response = await api.post(
      `/api/Instrument/create-instrument`,
      instrument
    );
    return response.data;
  } catch (error) {
    console.error(`Error creating instruments: ${error.message}`);
    return null;
  }
};

export async function updateInstrument(instrument) {
  try {
    const response = await api.put(
      `/api/Instrument/update-instrument/${instrument.id}`,
      instrument,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else return response.status;
  } catch (error) {
    console.log(`Error adding instrument: ${error.message}`);
  }
}

export async function deleteInstrumentById(id) {
  try {
    const result = await api.delete(`/api/Instrument/delete-instrument/${id}`);
    return result.data;
  } catch (error) {
    console.log(`Error delete instrument: ${error.message}`);
  }
}
//==================================Genre========================================

export const getGenre = async () => {
  try {
    const result = await api.get(`/api/genre/get-all-genre`);
    return result.data;
  } catch (error) {
    console.error(`Error fetching genres: ${error.message}`);
  }
};

export const createGenre = async (genre) => {
  try {
    const response = await api.post(`/api/genre/create-genre`, genre);
    return response.data;
  } catch (error) {
    console.error(`Error creating Genre: ${error.message}`);
    return null;
  }
};

export async function updateGenre(genre) {
  try {
    const response = await api.put(
      `/api/genre/update-genre/${genre.id}`,
      genre,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else return response.status;
  } catch (error) {
    console.log(`Error adding Genre: ${error.message}`);
  }
}

export async function deleteGenreById(id) {
  try {
    const result = await api.delete(`/api/genre/delete-genre/${id}`);
    return result.data;
  } catch (error) {
    console.log(`Error delete genre: ${error.message}`);
  }
}

//==================================DashBoard========================================
export async function getDataDashBoard(year, dateStart, dateEnd) {
  try {
    const result = await api.get(
      `/api/DashBoard?year=${year}&dateStart=${dateStart}&dateEnd=${dateEnd}`
    );
    return result.data;
  } catch (error) {
    console.log(`Error fetching data dashboard : ${error.message}`);
  }
}
api.interceptors.request.use(
  async (config) => {
    const state = store.getState(); // Get the current state from the store
    const { authUser } = state.authUser || {};
    const { token } = authUser || {};

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      (error.response.status === 403 || error.response.status === 401) &&
      !originalRequest._retry
    ) {
      store.dispatch(logout());
      window.location.href = "/login";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
