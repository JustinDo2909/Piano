// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Modal,
//   TextField,
//   Snackbar,
//   IconButton,
//   Select,
//   MenuItem,
//   Paper,
//   Box,
//   Popover,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Menu,
// } from "@mui/material";
// import { MoreHoriz } from "@mui/icons-material";
// import { useDispatch, useSelector } from "react-redux";
// import backGround from "../../image/3766921.jpg";
// import { useNavigate } from "react-router-dom";
// import { getSong } from "../../Redux/reducers/songsSlice";
// import { getSheet } from "../../util/ApiFunction";


// const { styled } = require("@mui/system");

// const SheetArtist = () => {
//   const dispatch = useDispatch();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const [list , setList] = useState(null);

//   useEffect(() => {
//       const fetchSongs = async () => {
//         const data = await getSheet();
//         console.log(data)
//         if (data !== null) {
//           setList(data)
//       };
//       fetchSongs();
//     }
//   }, []);


  
//   return (
//     <Box
//       sx={{
//         minHeight: "92vh",
//         background: `url(${backGround}) no-repeat center center fixed`,
//         backgroundSize: "cover",
//         padding: 0,
//       }}
//     >
//       <header
//         style={{
//           background: "rgba(0, 0, 0, 0.7)",
//           padding: "16px 24px",
//           textAlign: "center",
//           color: "#fff",
//         }}
//       >
//         <Typography variant="h4">MyAlbum</Typography>
//       </header>
//       <main
//         style={{
//           padding: 24,
//           margin: "24px auto",
//           background: "rgba(255, 255, 255, 0.8)",
//           borderRadius: "8px",
//           maxWidth: 1200,
//         }}
//       >
//         <Typography fontSize={"15px"} fontWeight={"600"} textAlign={"end"}>
//           Total : {list ? list.length : "0"}
//           { console.log(list)}
//         </Typography>


//         {/* <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Title</TableCell>
//                 <TableCell>Artist</TableCell>
//                 <TableCell>Type</TableCell>
//                 <TableCell>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {(list || []).map((music) => (
//                 <TableRow key={music.id}>
//                   <TableCell>{music.title}</TableCell>
//                   <TableCell>{music.composer}</TableCell>
//                   <TableCell>{music.genres}</TableCell>
//                   <TableCell>
//                     <IconButton onClick={(event) => handleClick(event, music)}>
//                       <MoreHoriz />
//                     </IconButton>
//                     <Menu
//                       anchorEl={anchorEl}
//                       open={Boolean(anchorEl)}
//                       onClose={handleClose}
//                     >
//                       <MenuItem onClick={handleClickDetail}>View Details</MenuItem>
//                       <MenuItem onClick={handleEdit}>Edit</MenuItem>
//                       <MenuItem onClick={() => handleDelete(musicSelected)}>Delete</MenuItem>
//                     </Menu>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer> */}
//       </main>
//     </Box>
//   );
// };

// export default SheetArtist;
