import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Box,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputBase,
  TableFooter,
  TablePagination,
} from "@mui/material";
import { SnackBar } from "../../components/Snackbar";
import {
  SearchOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  PersonAdd
} from "@mui/icons-material";
import {
  AddSong,
  addSong,
  deleteSongById,
  getAllArtist,
  getGenre,
  UpdateSong,
  updateSong,
} from "../../util/ApiFunction";
import useDebounce from "../../util/Debounce";
import SongDialog from "./SongDialog";
import FlexBetween from "../../components/FlexBetween";

const { styled } = require("@mui/system");

const TitleTableCell = styled(TableCell)`
  color: #535C91;
  font-size: 18px;
`;

const ItemTableCell = styled(TableCell)`
  padding: 8px 16px
`;

const Artist = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("");
  const [data, setData] = useState({
    artists: [],
    totalPage: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openRow, setOpenRow] = useState(null);
  const [isSongDialogOpen, setIsSongDialogOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [songToDelete, setSongToDelete] = useState(null);
  const [genres, setGenres] = useState([]);

  const inputSearchDebounced = useDebounce(inputSearch, 300);

  const fetchGenres = async () => {
    try {
      const result = await getGenre();
      if (result && result.data) {
        setGenres(result.data);
      }
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarType("error");
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchArtists = useCallback(async () => {
    try {
      const result = await getAllArtist(
        currentPage,
        rowsPerPage,
        inputSearchDebounced
      );
      if (result !== undefined) {
        setData({
          artists: result.data.songResponseByArtists,
          totalPage: result.data.totalPage,
        });
      }
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarType("error");
    }
  }, [currentPage, rowsPerPage, inputSearchDebounced]);

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleRowClick = (id) => {
    setOpenRow(openRow === id ? null : id); // Toggle the row open/close
  };

  const handleOpenSongDialog = (song = null) => {
    setIsEditMode(!!song);
    setSelectedSong(
      song
        ? {
          ...song,
        }
        : {
          id: "",
          title: "",
          composer: "",
          genreId: "",
          artistId: "",
          image: "",
        }
    );
    setIsSongDialogOpen(true);
  };

  const handleCloseSongDialog = () => {
    setIsSongDialogOpen(false);
    setSelectedSong(null);
  };

  const handleConfirmSong = async (event) => {
    event.preventDefault();
    try {
      if (isEditMode) {
        console.log(selectedSong);
        const result = await UpdateSong(
          selectedSong.id,
          selectedSong.title,
          selectedSong.composer,
          selectedSong.genreId,
          selectedSong.artistId,
          selectedSong.image
        );
        if (result) {
          setSnackbarMessage("Song updated successfully");
          setSnackbarType("success");
          fetchArtists();
          handleCloseSongDialog();
        } 
      } else {
        console.log(selectedSong);
        const result = await AddSong(
          selectedSong.title,
          selectedSong.composer,
          selectedSong.genreId,
          selectedSong.artistId,
          selectedSong.image
        );
        if (result) {
          setSnackbarMessage("Song added successfully");
          setSnackbarType("success");
          fetchArtists();
          handleCloseSongDialog();
        }
      }
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarType("error");
    }
    setSnackbarOpen(true);
  };
  

  const handleDelete = async () => {
    try {
      const result = await deleteSongById(songToDelete);
      if (result !== undefined) {
        fetchArtists();
        handleCloseDeleteDialog();
        setSnackbarMessage(`Delete ${songToDelete} deleted successfully.`);
        setSnackbarType("success");
      }
    } catch (error) {
      setSnackbarMessage("Error Delete User!!!");
      setSnackbarType("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleOpenDeleteDialog = (song) => {
    setSongToDelete(song.id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSongToDelete(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedSong((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ height: "auto", padding: 0 }}>
      <Box
        sx={{
          margin: 2,
          padding: 2,
          background: "rgba(255, 255, 255, 0.8)",
          borderRadius: "5px",
        }}
      >
        <SnackBar
          open={snackbarOpen}
          type={snackbarType}
          message={snackbarMessage}
          handleClose={handleCloseSnackbar}
        />

        <FlexBetween
          sx={{
            mb: "10px"
          }}>
          <Typography variant="h4" align="center" gutterBottom
            sx={{ m: "auto 0" }}>
            Manage Artist
          </Typography>
          <Box
            sx={{
              display: "inline-flex",
              gap: "10px"
            }}>
            <Button
              variant="contained"
              onClick={() => handleOpenSongDialog()}
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
              Add Song
              <PersonAdd />
            </Button>
            <Box
              display="flex"
              border="1px solid black"
              borderRadius="5px"
            >
              <InputBase
                sx={{ ml: 2, flex: 1 }}
                onChange={(e) => {
                  setInputSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <IconButton type="button" sx={{ p: 1 }}>
                <SearchOutlined />
              </IconButton>
            </Box>
          </Box>
        </FlexBetween>

        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead sx={{ height: "46px" }}>
              <TableRow>
                <TitleTableCell sx={{ width: "5%" }} />
                <TitleTableCell align="center">Id</TitleTableCell>
                <TitleTableCell align="center">Name</TitleTableCell>
                <TitleTableCell align="center">Date of Birth</TitleTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.artists.length > 0 ? (
                data.artists.map((artist, index) => (
                  <React.Fragment key={artist.id}>
                    <TableRow
                      onClick={() => handleRowClick(artist.id)}
                      sx={{
                        cursor: "pointer",
                        backgroundColor: index % 2 === 0 ? '#eee' : '#fff',
                        '&:hover': {
                          backgroundColor: '#f1f1f1',
                        },
                      }}
                    >
                      <TableCell align="center">
                        {openRow === artist.id ? (
                          <KeyboardArrowUp />
                        ) : (
                          <KeyboardArrowDown />
                        )}
                        {/* </IconButton> */}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "12px", fontWeight: "bold" }}>{artist.id}</TableCell>
                      <TableCell align="center" sx={{ fontSize: "12px" }}>{artist.name}</TableCell>
                      <TableCell align="center" sx={{ fontSize: "12px" }}>{artist.dateOfBirth}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={14} sx={{ padding: 0 }}>
                        <Collapse
                          in={openRow === artist.id}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box sx={{ m: "0.5rem" }}>
                            <Typography
                              variant="h6"
                              component="div"
                            >
                              Songs
                            </Typography>
                            <Table aria-label="songs">
                              <TableHead>
                                <TableRow>
                                  <TitleTableCell>Id</TitleTableCell>
                                  <TitleTableCell>Title</TitleTableCell>
                                  <TitleTableCell>Composer</TitleTableCell>
                                  <TitleTableCell>Genres</TitleTableCell>
                                  <TitleTableCell>Created Time</TitleTableCell>
                                  <TitleTableCell>Sheets</TitleTableCell>
                                  <TitleTableCell align="center">
                                    Actions
                                  </TitleTableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {artist.songs.length > 0 ? (
                                  artist.songs.map((song) => (
                                    <TableRow key={song.id}>
                                      <ItemTableCell>{song.id}</ItemTableCell>
                                      <ItemTableCell>{song.title}</ItemTableCell>
                                      <ItemTableCell>{song.composer}</ItemTableCell>
                                      <ItemTableCell>{song.genres}</ItemTableCell>
                                      <ItemTableCell>{song.createdTime}</ItemTableCell>
                                      <ItemTableCell>
                                        {/* {song.createdTime} */}
                                      </ItemTableCell>
                                      <ItemTableCell align="center">
                                        <Button
                                          variant="outlined"
                                          color="primary"
                                          onClick={() =>
                                            handleOpenSongDialog({
                                              ...song,
                                              artistId: artist.id,
                                            })
                                          }
                                        >
                                          Edit
                                        </Button>
                                        <Button
                                          variant="outlined"
                                          color="error"
                                          onClick={() =>
                                            handleOpenDeleteDialog(song)
                                          }
                                          sx={{ ml: 1 }}
                                        >
                                          Delete
                                        </Button>
                                      </ItemTableCell>
                                    </TableRow>
                                  ))
                                ) : (
                                  <TableRow>
                                    <ItemTableCell colSpan={10} align="center">
                                      No Songs available.
                                    </ItemTableCell>
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    No users available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={10}
                  count={data.totalPage * rowsPerPage}
                  page={currentPage - 1}
                  rowsPerPage={rowsPerPage}
                  onPageChange={(event, newPage) => {
                    setCurrentPage(newPage + 1); // Convert back to one-based index
                  }}
                  onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setCurrentPage(1);
                  }}
                  labelRowsPerPage="Rows per page"
                  labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} of ${count !== -1 ? count : `more than ${to}`
                    }`
                  }
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>

        <SongDialog
          open={isSongDialogOpen}
          handleClose={handleCloseSongDialog}
          song={selectedSong}
          handleConfirmSong={handleConfirmSong}
          isEditMode={isEditMode}
          handleChange={handleChange}
          artists={data.artists}
          genres={genres}
        />

        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"
            sx={{
              font: "18px Roboto",
              width: "500px",
              fontWeight: "bold",
            }}>
            Are you sure?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you really want to delete this song?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleDelete}
              autoFocus
              variant="contained"
              sx={{
                bgcolor: "#d00",
                "&:hover": {
                  bgcolor: "#b11"
                }
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
                }
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Artist;
