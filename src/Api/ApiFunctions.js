// import axios from "axios";


// export const api = axios.create({
//     baseURL: 'https://pianoai.somee.com',
//     withCredentials: true,

// });


// export const loginUser = async () => {
//     try {
//         const response =  await api.post("/api/Auth/login");
//         if( response.status >= 200 && response.status < 300){
//             return response.data;
//         }else return response.status;
//     } catch (error) {
//         if( error.response){
//             return{
//                 success: false,
//                 status: error.response.status,
//                 message: error.response.data?.message || "An error occurred"
//             };
//         }else{
//             return {success: false, message: error.message || "Netword error"};
//         }
//         }
//     }

// export const validateToken = async () => {
//   const token = localStorage.getItem("token");
//   if (token != null && token.length > 0) {
//     const result = await api.post("/api/auth/token");
//     return result;
//   } else {
//     const result = await api.post("/api/auth/token");
//     return result;
//   }
// };