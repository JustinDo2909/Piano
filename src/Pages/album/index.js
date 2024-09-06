import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  TextField,
  Snackbar,
  IconButton,
  Select,
  MenuItem,
  Paper,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Menu,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import { MusicNote, MoreHoriz } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import backGround from "../../image/3766921.jpg";
import { getSong } from "../../Redux/reducers/songsSlice";
import {
  AddSong,
  deleteSheetById,
  DeleteSong,
  GetAllGenre,
  getGenre,
  getMyInfo,
  GetMyInfo,
  getMySong,
  getSheetById,
  UpdateSong,
} from "../../util/ApiFunction";
import { info } from "../../Redux/reducers/authSlice";
import { getType } from "../../Redux/reducers/typeSlice";
import FlexBetween from "../../components/FlexBetween";
import { SnackBar } from "../../components/Snackbar";

const { styled, style } = require("@mui/system");
const TitleTableCell = styled(TableCell)`
  color: #535c91;
  font-size: 18px;
`;
const ItemTableCell = styled(TableCell)`
  font-size: 12px;
`;

const MyAlbum = () => {
  const dispatch = useDispatch();
  const [artistId, setArtistId] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedGenreSort, setSelectedGenreSort] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [list, setList] = useState([]);
  const [musicName, setMusicName] = useState("");
  const [author, setAuthor] = useState("");
  const [addedMusic, setAddedMusic] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [musicSelected, setMusicSelected] = useState("");
  const [songToDelete, setSongToDelete] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSheetDialog, setOpenSheetDialog] = useState(false);
  const [musicId, setMusicId] = useState("");
  const songs = useSelector((state) => state.songs.songs);
  const typess = useSelector((state) => state.types.types);
  const user = useSelector((state) => state.authUser.authUser);
  const [sheets, setSheets] = useState([{}])
  const open = Boolean(anchorEl);

  const fetchData = useCallback(async () => {
    try {
      if (!songs.length) {
        const songData = await getMySong();
        if (songData !== null) {
          dispatch(getSong(songData));
          setList(songData.data);
          console.log(songData.data);
        }
      }

      const genreData = await getGenre();
      if (genreData !== null) {
        dispatch(getType(genreData.data));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    try {
      const customerData = await getMyInfo();
      if (customerData !== null) {
        dispatch(info(customerData));
        console.log(customerData);
      }
      console.log("cut");
    } catch (error) {
      console.error("Error fetching customer info:", error);
    }
  }, [dispatch, songs.length]);

  useEffect(() => {
    fetchData();
  }, [fetchData, musicSelected, openDetail, imageFile, anchorEl]);

  useEffect(() => {
    if (selectedGenreSort === "All" || selectedGenreSort === "") {
      setList(songs.data);
    } else {
      setList(
        songs.data.filter((music) => music.genres[0] === selectedGenreSort)
      );
      console.log(list);
    }
  }, [selectedGenreSort, songs.data]);

  // useEffect(() => {
  //   if (musicSelected && musicSelected.genreId) {
  //     setSelectedGenre(musicSelected.genreId);
  //   }
  // }, [musicSelected, anchorEl]);

  const handleGenreChange = (event) => {
    setSelectedGenreSort(event.target.value);
  };

  const showAddMusicModal = () => {
    setIsModalVisible(true);
  };

  const handleAddMusic = async (event) => {
    event.preventDefault();

    const rep = await AddSong(
      musicName,
      user.data.name,
      selectedGenre,
      user.data.id,
      imageFile
    );
    if (rep.status === 200) {
      setSnackbar({ open: true, message: "Add success ! ", type: "success" });
    } else {
      setSnackbar({ open: true, message: "Add fail ! ", type: "error" });
    }
    console.log(rep);
    setIsModalVisible(false);
    setSelectedGenre("");
    setImageFile(null);
    setMusicName("");
    setAuthor("");
    setAddedMusic([]);
  };

  const handleImageUploadChange = (event) => {
    const file = event.target.files[0];

    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      // const reader = new FileReader();

      setImageFile(file);
      // reader.readAsDataURL(file);
    } else {
      setSnackbarMessage("You can only upload JPEG or PNG images!");
      // setSnackbarOpen(true);
    }
  };

  const handleClick = (event, music) => {
    setAnchorEl(event.currentTarget);
    setMusicSelected(music);
  };
  const handleSheetClick = async (music) => {
    const respone = await getSheetById(music.id)
    console.log(respone)
    if (respone) {
      setSheets(respone)
      setOpenSheetDialog(true)
    } else {
      alert('error')
    }
  };
  const handleCloseSheetDialog = () => {
    setOpenSheetDialog(false);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseDetail = () => {
    setMusicSelected("");
    setOpenDetail(false);
  };

  const handleClickDetail = (music) => {
    setOpenDetail(true);
    setAnchorEl(null);
  };

  const handleEdit = (music) => {
    setOpenEdit(true);
    setAnchorEl(null);
  };

  const handleColseEdit = () => {
    setMusicSelected("");
    setSelectedGenre("");
    setOpenEdit(false);
  };

  const handleDelete = async (music) => {
    const rep = await DeleteSong(music.id);
    if (rep.status === 200) {
      setSnackbar({
        open: true,
        message: "Delete success ! ",
        type: "success",
      });
    } else {
      setSnackbar({ open: true, message: "Change fail ! ", type: "error" });
    }
    setAnchorEl(null);
  };

  const handleOpenDeleteDialog = (song) => {
    setSongToDelete(song);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSongToDelete(null);
  };
  ;

  const handleSaveEdit = async () => {
    if (selectedGenre) {
      const song = {
        id: musicSelected.id,
        title: musicSelected.title,
        composer: musicSelected.composer,
        genreId: selectedGenre,
        artistId: user.data.id,
        image: imageFile,
      };
      const rep = await UpdateSong(
        musicSelected.id,
        musicSelected.title,
        musicSelected.composer,
        selectedGenre,
        user.data.id,
        imageFile
      );
      if (rep.status === 200) {
        setMusicSelected("");
        setSelectedGenre("");
        setOpenEdit(false);
        setSnackbar({
          open: true,
          message: "Edit Success ! ",
          type: "success",
        });
      } else {
        setSnackbar({ open: true, message: "Save fail ! ", type: "error" });
      }
    } else {
      alert("please choose genres");
    }
  };

  const getTextFieldStyle = () => ({
    mb: 2,
    "& .MuiInputBase-input": {
      fontSize: "14px",
    },
    "& .MuiOutlinedInput-input": {
      padding: "12px",
    },
  });

  const [page, setPage] = useState(1);
  const cardsPerPage = 4;
  const totalPages = Math.ceil(sheets.length / cardsPerPage);

  const handleNext = () => {
    if (page < totalPages) setPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  const getPaginatedData = () => {
    const startIndex = (page - 1) * cardsPerPage;
    return sheets.slice(startIndex, startIndex + cardsPerPage);
  };

  const handleDeleteSheet = async (sheetId) => {
    const respone = await deleteSheetById(sheetId)
    if(respone){
      window.location.reload();
      setSnackbar({ open: true, message: "Delete Success ! ", type: "success" });
    }else{
      setSnackbar({ open: true, message: "Delete fail ! ", type: "error" });
    }
    
  }
  const handleEditSheet = () => {

  }

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 96px)", // Chiều cao chiếm 1 phần nội dung màn hình
        background: `url(${backGround}) no-repeat center center fixed`,
        backgroundSize: "cover",
        padding: 2,
      }}
    >
      <main
        style={{
          padding: 16,
          background: "rgba(255, 255, 255, 0.8)",
          borderRadius: "5px",
          boxSizing: "border-box",
        }}
      >
        <FlexBetween
          sx={{
            mb: "10px",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ m: "auto 0" }}>
            My Album
          </Typography>
          <Box
            sx={{
              display: "inline-flex",
              gap: "10px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                m: "auto",
              }}
            >
              Total : {songs.data ? songs.data.length : "0"}
            </Typography>

            <Button
              variant="contained"
              onClick={showAddMusicModal}
              startIcon={<MusicNote />}
              sx={{
                color: "black",
                backgroundColor: "inherit",
                border: "1px solid black",
                boxShadow: "none",
                fontWeight: "bold",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                "&:hover": {
                  backgroundColor: "#535C91",
                  color: "#ddd",
                },
              }}
            >
              Add Music
            </Button>

            <Select
              value={selectedGenreSort}
              onChange={handleGenreChange}
              displayEmpty
              sx={{
                "& .MuiSelect-select": {
                  padding: 1,
                },
                border: "1px solid black",
              }}
            >
              <MenuItem value="" disabled>
                Select Genre
              </MenuItem>
              <MenuItem value="All">All</MenuItem>
              {typess.map((type) => (
                <MenuItem key={type.name} value={type.name}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </FlexBetween>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TitleTableCell>Title</TitleTableCell>
                <TitleTableCell>Artist</TitleTableCell>
                <TitleTableCell>Type</TitleTableCell>
                <TitleTableCell>Sheet</TitleTableCell>
                <TitleTableCell>Action</TitleTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(list || []).map((music, index) => (
                <TableRow
                  key={music.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#eee" : "#fff",
                    "&:hover": {
                      backgroundColor: "#f1f1f1",
                    },
                  }}
                >
                  <ItemTableCell>{music.title}</ItemTableCell>
                  <ItemTableCell>{music.composer}</ItemTableCell>
                  <ItemTableCell>{music.genres}</ItemTableCell>
                  <ItemTableCell>
                    <Button onClick={() => handleSheetClick(music)}>
                      Sheet
                    </Button>
                  </ItemTableCell>
                  <ItemTableCell>
                    <IconButton onClick={(event) => handleClick(event, music)}>
                      <MoreHoriz />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClickDetail}>
                        View Details
                      </MenuItem>
                      <MenuItem onClick={handleEdit}>Edit</MenuItem>
                      <MenuItem onClick={() => handleOpenDeleteDialog(music)}>
                        Delete
                      </MenuItem>
                    </Menu>
                  </ItemTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>

      <Modal open={isModalVisible} onClose={() => setIsModalVisible(false)}>
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
          <Typography variant="h4" fontFamily="Roboto" gutterBottom>
            Add Music
          </Typography>
          <TextField
            label="Music Name"
            fullWidth
            margin="dense"
            value={musicName}
            onChange={(e) => setMusicName(e.target.value)}
            sx={getTextFieldStyle()}
          />
          <TextField
            label="Author"
            fullWidth
            margin="dense"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            sx={getTextFieldStyle()}
          />
          <Select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            fullWidth
            margin="dense"
            sx={getTextFieldStyle()}
          >
            <MenuItem value="" disabled>
              Select Genre
            </MenuItem>
            {typess.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleImageUploadChange}
          />
          <Box sx={{ textAlign: "right" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsModalVisible(false)}
              sx={{
                mr: 2,
                border: "1px solid black",
                bgcolor: "inherit",
                color: "#333",
                "&:hover": {
                  bgcolor: "#eee",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddMusic}
              sx={{
                bgcolor: "#211f65",
                color: "#eee",
                "&:hover": {
                  backgroundColor: "#0f0e38",
                  color: "#fff",
                },
              }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Modal>

      <Dialog open={openEdit} onClose={handleColseEdit} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{ textAlign: "center", color: "#00796b", fontWeight: "bold" }}
        >
          Edit Music
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2, textAlign: "center", color: "#555" }}>
            Update the details of the music.
          </DialogContentText>
          <TextField
            label="Music Name"
            fullWidth
            margin="dense"
            value={musicSelected.title || ""}
            onChange={(e) =>
              setMusicSelected({
                ...musicSelected,
                title: e.target.value,
              })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Author"
            fullWidth
            margin="dense"
            value={musicSelected.composer || ""}
            onChange={(e) =>
              setMusicSelected({
                ...musicSelected,
                composer: e.target.value,
              })
            }
            sx={{ mb: 2 }}
          />
          <Select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            displayEmpty
            fullWidth
            required
            sx={{ mb: 2 }}
          >
            <MenuItem value="" disabled>
              Select Genre
            </MenuItem>
            {typess.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleImageUploadChange}
            style={{ marginTop: 16, display: "block" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleColseEdit}
            sx={{ color: "#f44336", fontWeight: "bold" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveEdit}
            sx={{ color: "#4CAF50", fontWeight: "bold" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDetail}
        onClose={handleCloseDetail}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{ textAlign: "center", color: "#00796b", fontWeight: "bold" }}
        >
          Music Details
        </DialogTitle>
        <DialogContent sx={{ p: "0px 20px" }}>
          <Box
            sx={{
              backgroundColor: "#f9f9f9",
              padding: 3,
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              mb: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "#333",
                mb: 1,
              }}
            >
              {musicSelected.title || "N/A"}
            </Typography>
            <Box
              sx={{ display: "flex", gap: "5%", alignItems: "center", mb: 1 }}
            >
              <Typography variant="subtitle1" color="textSecondary">
                Author:
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: "500", color: "#333" }}
              >
                {musicSelected.composer || "N/A"}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "5%", alignItems: "center" }}>
              <Typography variant="subtitle1" color="textSecondary">
                Genre:
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: "500", color: "#333" }}
              >
                {musicSelected.genres || "N/A"}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDetail}
            sx={{ color: "#00796b", fontWeight: "bold" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            font: "18px Roboto",
            width: "500px",
            fontWeight: "bold",
          }}
        >
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete this song
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleDelete(songToDelete)}
            autoFocus
            variant="contained"
            sx={{
              bgcolor: "#d00",
              "&:hover": {
                bgcolor: "#b11",
              },
            }}
          >
            Delete
          </Button>
          <Button
            onClick={handleCloseDeleteDialog}
            variant="contained"
            sx={{
              border: "1px solid black",
              bgcolor: "inherit",
              color: "#333",
              "&:hover": {
                bgcolor: "#eee",
              },
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Modal
      open={openSheetDialog}
      onClose={handleCloseSheetDialog}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography textAlign="center" id="modal-modal-title" variant="h4" component="h2">
          Sheets of Song
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
          {getPaginatedData().map((sheet) => (
            <Card key={sheet.id} sx={{ maxWidth: 200 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={sheet.backgroundMusicFile}
                  alt="sheet background"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {sheet.name}
                  </Typography>
                  <Typography>
                    {sheet.level === 0 ? 'easy' : sheet.level === 1 ?  'normal' : 'hard'}
                  </Typography>
                  
                </CardContent>
              </CardActionArea>
              <Button onClick={handleEditSheet}>Edit</Button>
              <Button onClick={() =>handleDeleteSheet(sheet.id)}>Delete</Button>
            </Card>
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button onClick={handlePrev} disabled={page === 1}>
            Previous
          </Button>
          <Typography>
            Page {page} of {totalPages}
          </Typography>
          <Button onClick={handleNext} disabled={page === totalPages}>
            Next
          </Button>
        </Box>
      </Box>
    </Modal>
    <SnackBar
        open={snackbar.open}
        type={snackbar.type}
        message={snackbar.message}
        handleClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </Box>
    
  );
};

export default MyAlbum;
