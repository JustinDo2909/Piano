import React, { useEffect, useState } from "react";
import backGround from "../../image/3766921.jpg";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  CardActions,
  openDialog,
  DialogContentText,
  setSnackbarMessage,
  setSnackbarType,
  setSnackbarOpen
} from "@mui/material";
import { QueueMusic, ModeEdit, DeleteOutlined } from "@mui/icons-material";
import { getGenre, updateGenre, createGenre, deleteGenreById } from "../../util/ApiFunction";
import { SnackBar } from "../../components/Snackbar";
import FlexBetween from "../../components/FlexBetween";

const TypeMusic = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [error, setError] = useState("");
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState(null);
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("");
  const [genreToDelete, setGenreToDelete] = useState(null)
  const [openDialog, setOpenDialog] = useState(false);

  const fetchGenre = async () => {
    try {
      const result = await getGenre();
      if (result && result.data) {
        setGenres(result.data);
      }
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  useEffect(() => {
    fetchGenre();
  }, []);

  const handleClickOpen = (genre = null) => {
    setIsEditMode(!!genre);
    setNewGenre(
      genre
        ? {
          ...genre,
        }
        : {
          name: "",
          description: ""
        }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewGenre((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGenre = async (event) => {
    event.preventDefault();
    try {
      if (isEditMode) {
        console.log(newGenre);
        const result = await updateGenre(newGenre);
        console.log(result)
        if (result && result.message) {
          fetchGenre();
          setSnackbarMessage("Genre Edited successfully.");
          setSnackbarType("success");
          handleClose(); // Close dialog after successful edition
        }
      } else {
        console.log(newGenre);
        const result = await createGenre(newGenre);
        if (result && result.message) {
          fetchGenre();
          setSnackbarMessage("Genre Added successfully.");
          setSnackbarType("success");
          handleClose(); // Close dialog after successful addition
        }
      }
    } catch (error) {
      setSnackbarMessage(
        isEditMode ? "Error Update Genre!!" : "Error Add Genre!!"
      );
      setSnackbarType("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deleteGenreById(genreToDelete);
      if (result !== undefined) {
        fetchGenre();
        handleCloseDialog();
        setSnackbarMessage(
          `Genre ${genreToDelete} deleted successfully.`
        );
        setSnackbarType("success");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage("Error Delete Genre!!!");
      setSnackbarType("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleOpenDialog = (genre) => {
    setGenreToDelete(genre.id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setGenreToDelete(null);
  };

  const getTextFieldStyle = () => ({
    mb: 2,
    '& .MuiInputBase-input': {
      fontSize: '14px',
    },
    '& .MuiOutlinedInput-input': {
      padding: '12px',
    },
  });

  return (
    <Box
      sx={{
        background: `url(${backGround}) no-repeat center center fixed`,
        minHeight: "calc(100vh - 96px)", // Chiều cao chiếm 1 phần nội dung màn hình
        padding: 2
      }}
    >
      <Box
        style={{
          padding: 16,
          background: "rgba(255, 255, 255, 0.8)",
          borderRadius: "5px",
          boxSizing: "border-box",
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
          <Typography variant="h4" gutterBottom>
            Manage Music Genres
          </Typography>
          <Button
            variant="contained"
            onClick={() => handleClickOpen()}
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
            Add Genre
            <QueueMusic />
          </Button>
        </FlexBetween>

        <Grid container spacing={2}>
          {genres.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  position: "relative",
                  background: `url(${backGround}) no-repeat center center`,
                  backgroundSize: "cover",
                  color: "#fff",
                  height: "100%",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0, 0, 0, 0.6)",
                    zIndex: 1,
                    pointerEvents: "none",
                  }}
                />
                <CardContent sx={{
                  position: "relative",
                  zIndex: 2,

                }}>
                  <Box sx={{
                    maxWidth: "60%",
                    position: "absolute",
                    top: "50%",
                    left: "20%",
                    transform: "translate(-50%, -50%)",
                  }}>
                    <Typography variant="h4" fontFamily="Roboto" gutterBottom>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" textAlign="center" textOverflow="ellipsis" gutterBottom>
                      {item.description}
                    </Typography>

                  </Box>
                  <CardActions
                    sx={{
                      position: "relative",
                      zIndex: 2,
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      onClick={() => handleClickOpen(item)}
                      sx={{
                        borderRadius: 20,
                        border: "1px solid green",
                        bgcolor: "#eeea"
                      }}
                    >
                      <ModeEdit
                        sx={{
                          color: "#2f2"
                        }} />
                    </Button>
                    <Button
                      onClick={() => handleOpenDialog(item)}
                      sx={{
                        borderRadius: 20,
                        border: "1px solid red",
                        bgcolor: "#eeea"
                      }}
                    >
                      <DeleteOutlined
                        sx={{
                          color: "#f22"
                        }} />
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog open={open} onClose={handleClose}
        sx={{ boxSizing: "border-box" }}>
        <Typography variant="h4" fontFamily="Roboto"
          sx={{ p: 2 }}>
          {isEditMode ? "Edit Genre" : "Add Genre"}
        </Typography>
        <DialogContent sx={{ p: "10px 20px" }}>

          <TextField
            autoFocus
            label="Genre Name"
            name="name"
            fullWidth
            value={newGenre?.name || ""}
            onChange={(e) => handleChange(e)}
            sx={getTextFieldStyle()}
          />
          <TextField
            autoFocus
            label="Genre description"
            name="description"
            fullWidth
            value={newGenre?.description || ""}
            onChange={(e) => handleChange(e)}
            sx={getTextFieldStyle()}
          />
          {error && <div style={{ color: "red" }}>{error}</div>}
          <DialogActions>
            <Button onClick={handleClose} color="primary"
              sx={{
                border: "1px solid black",
                bgcolor: "inherit",
                color: "#333",
                "&:hover": {
                  bgcolor: "#eee",
                }
              }}>
              Cancel
            </Button>
            <Button onClick={(e) => handleGenre(e)} color="primary"
              sx={{
                bgcolor: "#211f65",
                color: "#eee",
                "&:hover": {
                  backgroundColor: "#0f0e38",
                  color: "#fff",
                },
              }}>
              Confirm
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"
          sx={{
            font: "18px Roboto",
            width: "500px",
            fontWeight: "bold",
          }}>
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete this genre?
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
            onClick={handleCloseDialog}
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
  );
};

export default TypeMusic;
