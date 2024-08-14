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
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Upload, Close, MusicNote, MoreVert } from "@mui/icons-material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';  
import { useDispatch, useSelector } from "react-redux";
import { setMusicList, addMusic } from "../../Redux/reducers/musicReducer";
import musicData from "../../Data/Music.json";
import typeData from "../../Data/TypeMusic.json";
import backGround from "../../image/3766921.jpg";
import { useNavigate } from "react-router-dom";
import { getSong } from "../../util/ApiFunction";

const { styled } = require("@mui/system");

const MyAlbum = () => {
  const dispatch = useDispatch();
  const musicList = useSelector((state) => state.music.musicList);
  const [selectedArtist, setSelectedArtist] = useState("001");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedGenreSort, setSelectedGenreSort] = useState("");
  const [fileList, setFileList] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [list, setList] = useState([]);
  const navigate = useNavigate("");
  const [musicName, setMusicName] = useState("");
  const [author, setAuthor] = useState("");
  const [addedMusic, setAddedMusic] = useState([]); // To store added music
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [musicSelected, setMusicSelected] = useState("");
  const open = Boolean(anchorEl);
  // Style
  const GreenTableCell = styled(TableCell)`
    color: green;
    font-size: 16px;
  `;
  const TextSize = styled(Typography)`
    font-size: 15px;
  `;
  const CustomTableCell = ({ children, ...props }) => (
    <TableCell
      sx={{
        padding: "4px 8px",
        fontSize: "0.875rem",
      }}
      {...props}
    >
      {children}
    </TableCell>
  );

  useEffect(() => {
    // const fetchSongs = async () => {
    //   await getSong();
    // };
    // fetchSongs();
    dispatch(setMusicList(musicData));
  }, [dispatch]);

  useEffect(() => {
    setList(filteredMusic);
  }, [musicList]);

  const handleArtistChange = (event) => {
    setSelectedArtist(event.target.value);
  };

  const handleGenreChange = (event) => {
    const genre = event.target.value;
    setSelectedGenreSort(genre);

    if (genre === "All") {
      setList(filteredMusic);
    } else {
      const filtered = filteredMusic.filter((music) => music.type === genre);
      setList(filtered);
    }
  };

  const showAddMusicModal = () => {
    setIsModalVisible(true);
  };

  const handleApply = () => {
    if (fileList.length === 0 || fileList[0].type !== "audio/mpeg") {
      setSnackbarMessage("Please upload a valid MP3 file.");
      setSnackbarOpen(true);
      return;
    }
    const newMusic = {
      idMusic: musicList.length + 1,
      nameMusic: musicName,
      author: author,
      type: selectedGenre,
      mp3File: fileList[0],
      artist: {
        idArtist: selectedArtist,
        nameArtist: musicList.find(
          (music) => music.artist.idArtist === selectedArtist
        ).artist.nameArtist,
      },
    };
    setAddedMusic([...addedMusic, newMusic]);
  };
  const handleAddMusic = (event) => {
    event.preventDefault();
    if (fileList.length === 0 || fileList[0].type !== "audio/mpeg") {
      setSnackbarMessage("Please upload a valid MP3 file.");
      setSnackbarOpen(true);
      return;
    }

    const newMusic = {
      idMusic: musicList.length + 1,
      nameMusic: musicName,
      author: author,
      type: selectedGenre,
      mp3File: fileList[0],
      artist: {
        idArtist: selectedArtist,
        nameArtist: musicList.find(
          (music) => music.artist.idArtist === selectedArtist
        ).artist.nameArtist,
      },
    };
    dispatch(addMusic(newMusic));
    setIsModalVisible(false);
    setSelectedGenre("");
    setFileList([]);
    setMusicName("");
    setAuthor("");
    setAddedMusic([]);
  };

  const filteredMusic = musicList.filter(
    (music) => music.artist.idArtist === selectedArtist
  );

  const handleUploadChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "audio/mpeg") {
      setFileList([file]);
    } else {
      setSnackbarMessage("You can only upload MP3 files!");
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
  const handleColseEdit = (music) => {
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
          Total : {list.length}
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
          <MenuItem value="All">All</MenuItem>
          {typeData.map((type) => (
            <MenuItem key={type.idTypeMusic} value={type.nameTypeMusic}>
              {type.nameTypeMusic}
            </MenuItem>
          ))}
        </Select>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <GreenTableCell>Id</GreenTableCell>
                <GreenTableCell>Name</GreenTableCell>
                <GreenTableCell>Author</GreenTableCell>
                <GreenTableCell>Type</GreenTableCell>
                <GreenTableCell>Number of Plays</GreenTableCell>
                <GreenTableCell>MP3 File</GreenTableCell>
                <GreenTableCell>Actions</GreenTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((music) => (
                <TableRow key={music.idMusic}>
                  <CustomTableCell>{music.idMusic}</CustomTableCell>
                  <CustomTableCell>{music.nameMusic}</CustomTableCell>
                  <CustomTableCell>{music.author}</CustomTableCell>
                  <CustomTableCell>{music.type}</CustomTableCell>
                  <CustomTableCell>{music.NumberOfPlayed}</CustomTableCell>
                  <CustomTableCell>
                    {music.mp3File ? (
                      <a href={URL.createObjectURL(music.mp3File)} download>
                        Download
                      </a>
                    ) : (
                      "No file"
                    )}
                  </CustomTableCell>
                  <CustomTableCell>
                  <IconButton onClick={(event) => handleClick(event, music)}>
                      <MoreVert />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={
                        Boolean(anchorEl) &&
                        musicSelected.idMusic === music.idMusic
                      }
                      onClose={handleClose}
                    >
                      <MenuItem onClick={() => handleClickDetail(music)}>
                        Detail
                      </MenuItem>
                      <MenuItem onClick={() => handleEdit(music)}>
                        Edit
                      </MenuItem>
                      <MenuItem onClick={() => handleDelete(music)}>
                        Delete
                      </MenuItem>
                    </Menu>
                  </CustomTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal
          open={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              maxWidth: 900,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography textAlign={"center"} variant="h2" gutterBottom>
              ADD MUSIC TO YOUR ALBUM
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                mb: 2,
                gap: 2,
              }}
            >
              <TextField
                label="Music Name"
                value={musicName}
                onChange={(e) => setMusicName(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                fullWidth
              />
              <Select
                name="type"
                value={selectedGenre}
                onChange={(event) => setSelectedGenre(event.target.value)}
                displayEmpty
                fullWidth
                required
              >
                <MenuItem value="" disabled>
                  Select Genre
                </MenuItem>
                {typeData.map((type) => (
                  <MenuItem key={type.idTypeMusic} value={type.nameTypeMusic}>
                    {type.nameTypeMusic}
                  </MenuItem>
                ))}
              </Select>
              <input
                accept="audio/*"
                style={{ display: "none" }}
                id="file-upload"
                type="file"
                onChange={handleUploadChange}
              />
              <label htmlFor="file-upload">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  startIcon={<Upload />}
                >
                  Upload MP3
                </Button>
              </label>
              {fileList.length > 0 && (
                <Typography color="textSecondary">
                  {fileList[0].name}
                </Typography>
              )}
              <Button
                variant="contained"
                onClick={handleApply}
                sx={{ mb: 2, backgroundColor: "black", color: "white" }}
              >
                Apply
              </Button>
            </Box>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <GreenTableCell>No</GreenTableCell>
                    <GreenTableCell>Name</GreenTableCell>
                    <GreenTableCell>Author</GreenTableCell>
                    <GreenTableCell>Type</GreenTableCell>
                    <GreenTableCell>MP3</GreenTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {addedMusic.map((music, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{music.nameMusic}</TableCell>
                      <TableCell>{music.author}</TableCell>
                      <TableCell>{music.type}</TableCell>
                      <TableCell>
                        {music.mp3File ? (
                          <a href={URL.createObjectURL(music.mp3File)} download>
                            Download
                          </a>
                        ) : (
                          "No file"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center ",
                gap: 2,
                mt: 2,
              }}
            >
              <Button
                variant="outlined"
                color="error"
                onClick={() => setIsModalVisible(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleAddMusic}
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </Modal>
      </main>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setSnackbarOpen(false)}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      />
      {openDetail && (
        <Dialog
          open={openDetail}
          onClose={handleCloseDetail}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <DialogContent sx={{ display: "flex", gap: 1 }}>
            <img style={{ width: "50%" }} src={backGround} alt="Background" />
            <DialogContentText
              sx={{ borderLeft: "2px solid black", pl: 5 }}
              id="alert-dialog-description"
            >
              <Typography variant="h4">INFORMATION </Typography>
              <TextSize>Name : {musicSelected.nameMusic}</TextSize>
              <TextSize>Author : {musicSelected.author}</TextSize>
              <TextSize>Type : {musicSelected.type}</TextSize>
              <TextSize>Played : {musicSelected.NumberOfPlayed}</TextSize>
              <TextSize>
                Mp3 file :
                {musicSelected.mp3File ? (
                  <a href={URL.createObjectURL(musicSelected.mp3File)} download>
                    Download
                  </a>
                ) : (
                  "No file"
                )}
              </TextSize>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDetail} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {openEdit && (
        <Dialog
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              handleSaveEdit();
            },
          }}
        >
          <DialogTitle fontSize={"25px"} textAlign={"center"}>
            EDIT
          </DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
            }}
          >
            <TextField
              autoFocus
              required
              margin="dense"
              id="Name"
              name="Name"
              value={musicSelected.nameMusic}
              label="Name"
              fullWidth
              onChange={(e) =>
                setMusicSelected({
                  ...musicSelected,
                  nameMusic: e.target.value,
                })
              }
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="Author"
              name="Author"
              value={musicSelected.author}
              label="Author"
              fullWidth
              onChange={(e) =>
                setMusicSelected({ ...musicSelected, author: e.target.value })
              }
            />
            <TextField
              label="Type"
              select
              name="type"
              value={musicSelected.type}
              onChange={(e) =>
                setMusicSelected({ ...musicSelected, type: e.target.value })
              }
              displayEmpty
              fullWidth
              required
            >
              {typeData.map((type) => (
                <MenuItem key={type.idTypeMusic} value={type.nameTypeMusic}>
                  {type.nameTypeMusic}
                </MenuItem>
              ))}
            </TextField>
            <input
              id="file-upload"
              type="file"
              accept="audio/*"
              onChange={handleUploadChange}
              style={{ display: "block", width: "60%" }}
            />
            {musicSelected.mp3File && (
              <Typography color="textSecondary">
                <a href={URL.createObjectURL(musicSelected.mp3File)} download>
                  Download
                </a>
              </Typography>
            )}
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              color="info"
              variant="outlined"
              onClick={() => setOpenEdit(false)}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default MyAlbum;
