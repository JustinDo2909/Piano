import React, { useEffect, useState } from "react";
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
  Popover,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Upload, Close, MusicNote, MoreHoriz } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMusicList, addMusic } from "../../Redux/reducers/musicReducer";
import typeData from "../../Data/TypeMusic.json";
import backGround from "../../image/3766921.jpg";
import { useNavigate } from "react-router-dom";
import { getSong } from "../../Redux/reducers/songsSlice";
import { AddSong, GetAllGenre, GetMyInfo, GetMySong } from "../../util/ApiFunction";
import { info } from "../../Redux/reducers/authSlice";

const { styled } = require("@mui/system");

const MyAlbum = () => {
  const dispatch = useDispatch();
  const musicList = useSelector((state) => state.music.musicList);
  const [selectedArtist, setSelectedArtist] = useState("001");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedGenreSort, setSelectedGenreSort] = useState("");
  const [imageFile, setImageFile] = useState(""); 
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const [musicName, setMusicName] = useState("");
  const [author, setAuthor] = useState("");
  const [addedMusic, setAddedMusic] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [musicSelected, setMusicSelected] = useState("");
  const songs = useSelector((state) => state.songs.songs);
  const types = useSelector((state) => state.types.types);
  const user = useSelector((state) => state.authUser.authUser);
  const open = Boolean(anchorEl);
  
  const getsong = GetMySong();
  useEffect(() => {
    if (!songs.length) {
      const fetchSongs = async () => {
        const data = await getsong();
        if (data !== null) {
          dispatch(getSong(data));
          setList(data)
          console.log(songs.data) 
        }
      };
      fetchSongs();
    }
  }, []);

  const getMyInfo = GetMyInfo();
  useEffect(() => {
    const getCustomer = async () => {
      const data = await getMyInfo();
      if (data !== null) {
        dispatch(info(data))
        console.log(data)
      }
      console.log('cut')
    };
    getCustomer();
  }, [])

  useEffect(() => {
    const filteredMusic = musicList.filter(
      (music) => music.artist.idArtist === selectedArtist
    );
    if (selectedGenreSort === "All") {
      setList(filteredMusic);
    } else {
      setList(filteredMusic.filter((music) => music.type === selectedGenreSort));
    }
  }, [musicList, selectedArtist, selectedGenreSort]);

  const handleArtistChange = (event) => {
    setSelectedArtist(event.target.value);
  };

  const handleGenreChange = (event) => {
    setSelectedGenreSort(event.target.value);
  };

  const showAddMusicModal = () => {
    setIsModalVisible(true);
  };



  const handleAddMusic = async (event) => {
    event.preventDefault();
    const newMusic = {
      title: musicName,
      composer: user.data.name,
      genreId: selectedGenre,
      artistId: user.data.id,
      image: "test", 
      
    };
    const rep = await AddSong(newMusic);
    if(rep.status === 200){
      window.location.reload()  
    }
    console.log(newMusic)
    console.log(rep)
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
      setImageFile(file);
    } else {
      setSnackbarMessage("You can only upload JPEG or PNG images!");
      setSnackbarOpen(true);
    }
  };

  const handleClick = (event, music) => {
    setMusicSelected(music);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseDetail = () => {
    setMusicSelected("");
    setOpenDetail(false);
  };

  const handleClickDetail = (music) => {
    setMusicSelected(music);
    setOpenDetail(true);
    setAnchorEl(null);
  };

  const handleEdit = (music) => {
    setMusicSelected(music);
    setOpenEdit(true);
    setAnchorEl(null);
  };

  const handleColseEdit = () => {
    setMusicSelected("");
    setOpenEdit(false);
  };

  const handleDelete = (music) => {
    const updatedList = musicList.filter((m) => m.idMusic !== music.idMusic);
    dispatch(setMusicList(updatedList));
    setAnchorEl(null);
  };

  const handleSaveEdit = () => {
    const updatedMusicList = musicList.map((music) =>
      music.idMusic === musicSelected.idMusic ? musicSelected : music
    );
    dispatch(setMusicList(updatedMusicList));
    setOpenEdit(false);
    setMusicSelected("");
  };

  return (
    <Box
      sx={{
        minHeight: "92vh",
        background: `url(${backGround}) no-repeat center center fixed`,
        backgroundSize: "cover",
        padding: 0,
      }}
    >
      <header
        style={{
          background: "rgba(0, 0, 0, 0.7)",
          padding: "16px 24px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Typography variant="h4">MyAlbum</Typography>
      </header>
      <main
        style={{
          padding: 24,
          margin: "24px auto",
          background: "rgba(255, 255, 255, 0.8)",
          borderRadius: "8px",
          maxWidth: 1200,
        }}
      >
        <Typography fontSize={"15px"} fontWeight={"600"} textAlign={"end"}>
          Total : {songs.data ? songs.data.length : '0'}
        </Typography>

        <Button
          variant="contained"
          color="success"
          onClick={showAddMusicModal}
          startIcon={<MusicNote />}
        >
          Add Music
        </Button>

        <Select
          value={selectedGenreSort}
          onChange={handleGenreChange}
          displayEmpty
          sx={{ ml: "80%" }}
        >
          <MenuItem value="" disabled>
            Select Genre
          </MenuItem>
          {types.map((type) => (
            <MenuItem key={type.name} value={type.name}>
              {type.name}
            </MenuItem>
          ))}
        </Select>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Artist</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(list.data || []).map((music) => (
                <TableRow key={music.id}>
                  <TableCell>{music.title}</TableCell>
                  <TableCell>{music.composer}</TableCell>
                  <TableCell>{music.genres}</TableCell>
                  <TableCell>
                    <IconButton onClick={(event) => handleClick(event, music)}>
                      <MoreHoriz />
                    </IconButton>
                    <Popover
                      open={Boolean(anchorEl)}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    >
                      <MenuItem onClick={() => handleClickDetail(music)}>View Details</MenuItem>
                      <MenuItem onClick={() => handleEdit(music)}>Edit</MenuItem>
                      <MenuItem onClick={() => handleDelete(music)}>Delete</MenuItem>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>

      <Modal open={isModalVisible} onClose={() => setIsModalVisible(false)}>
        <Box
          sx={{
            width: 400,
            padding: 3,
            background: "white",
            margin: "auto",
            marginTop: "15%",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add Music
          </Typography>
          <TextField
            label="Music Name"
            fullWidth
            margin="dense"
            value={musicName}
            onChange={(e) => setMusicName(e.target.value)}
          />
          <TextField
            label="Author"
            fullWidth
            margin="dense"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <Select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            fullWidth
            margin="dense"
          >
            <MenuItem value="" disabled>
              Select Genre
            </MenuItem>
            {types.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleImageUploadChange}
            style={{ marginTop: 16, display: 'block' }}
          />
          <Box mt={2} sx={{ textAlign: "right" }}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setIsModalVisible(false)}
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleAddMusic}>
              Add
            </Button>
          </Box>
        </Box>
      </Modal>

      <Dialog open={openEdit} onClose={handleColseEdit}>
        <DialogTitle>Edit Music</DialogTitle>
        <DialogContent>
          <DialogContentText>
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
          />
          {/* <TextField
            label="Genre"
            fullWidth
            margin="dense"
            value={musicSelected.type || ""}
            onChange={(e) =>
              setMusicSelected({
                ...musicSelected,
                type: e.target.value,
              })
            }
          /> */}
            <Select
          value={selectedGenreSort}
          onChange={handleGenreChange}
          displayEmpty
          sx={{ ml: "80%" }}
        >
          <MenuItem value="" disabled>
            Select Genre
          </MenuItem>
          {types.map((type) => (
            <MenuItem key={type.name} value={type.name}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleColseEdit}>Cancel</Button>
          <Button onClick={handleSaveEdit}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDetail} onClose={handleCloseDetail}>
        <DialogTitle>Music Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Details of the selected music.
          </DialogContentText>
          <TextField
            label="Music Name"
            fullWidth
            margin="dense"
            value={musicSelected.nameMusic || ""}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Author"
            fullWidth
            margin="dense"
            value={musicSelected.author || ""}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Genre"
            fullWidth
            margin="dense"
            value={musicSelected.type || ""}
            InputProps={{
              readOnly: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetail}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default MyAlbum;
