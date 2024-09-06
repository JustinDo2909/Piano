import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { ModeEdit, DeleteOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import {
  getInstrument,
  createInstrument,
  updateInstrument,
  deleteInstrumentById,
} from "../../util/ApiFunction";
import instrumentTitle from "../../image/instrumentTitle.png";
import { SnackBar } from "../../components/Snackbar";
import FlexBetween from "../../components/FlexBetween";
import { minWidth, width } from "@mui/system";

const Instrument = () => {
  const [error, setError] = useState("");
  const [instruments, setInstruments] = useState([]);
  const [open, setOpen] = useState(false);
  const [newInstrument, setNewInstrument] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [instrumentToDelete, setInstrumentToDelete] = useState(null);

  const fetchInstrument = async () => {
    try {
      const result = await getInstrument();
      if (result && result.data) {
        setInstruments(result.data);
      }
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  useEffect(() => {
    fetchInstrument();
  }, []);

  const handleClickOpen = (instrument = null) => {
    setIsEditMode(!!instrument);
    setNewInstrument(
      instrument
        ? {
          ...instrument,
        }
        : {
          name: "",
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
    setNewInstrument({ ...newInstrument, name: event.target.value });
  };

  const handleAddInstrument = async (event) => {
    event.preventDefault();
    try {
      if (isEditMode) {
        console.log(newInstrument);
        const result = await updateInstrument(newInstrument);
        if (result && result.data) {
          fetchInstrument();
          setSnackbarMessage("Instrument Edited successfully.");
          setSnackbarType("success");
          handleClose(); // Close dialog after successful addition
        }
      } else {
        console.log(newInstrument);
        const result = await createInstrument(newInstrument);
        if (result && result.data) {
          fetchInstrument();
          setSnackbarMessage("Instrument Added successfully.");
          setSnackbarType("success");
          handleClose(); // Close dialog after successful edition
        }
      }
    } catch (error) {
      setSnackbarMessage(
        isEditMode ? "Error Update Instrument!!" : "Error Add Instrument!!"
      );
      setSnackbarType("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deleteInstrumentById(instrumentToDelete);
      if (result !== undefined) {
        fetchInstrument();
        handleCloseDialog();
        setSnackbarMessage(
          `Instrument ${instrumentToDelete} deleted successfully.`
        );
        setSnackbarType("success");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage("Error Delete Instrument!!!");
      setSnackbarType("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleOpenDialog = (instrument) => {
    setInstrumentToDelete(instrument.id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setInstrumentToDelete(null);
  };

  const getTextFieldStyle = () => ({
    mb: 2,
    minWidth: "350px",
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
        height: "auto",
        padding: 2
      }}>
      <Box
        style={{
          padding: 16,
          background: "rgba(255, 255, 255, 0.8)",
          borderRadius: "5px",
          boxSizing: "border-box",
        }}>
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
            Manage Instrument
          </Typography>
          <Button
            variant="contained"
            endIcon={<LibraryMusicIcon />}
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
            Add Instrument
          </Button>
        </FlexBetween>

        <Grid container spacing={2}>
          {instruments.map((instrument , index) => (
            <Grid item xs={6} sm={6} md={3} key={index}>
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  boxSizing: "border-box"
                }}
              >
                <CardMedia
                  component="img"
                  height="100"
                  image={instrumentTitle}
                  alt="Instruments"
                  sx={{ width: "100px", objectFit: "contain" }}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    p: 1,
                    pb: " 12px !important",
                    width: "100%",
                  }}
                >
                  <Typography sx={{ fontSize: "12px" }}> Instrument:</Typography>
                  <Typography variant="h4">{instrument.name}</Typography>
                  <DialogActions
                    sx={{
                      justifyContent: "flex-start",
                      p: 0,
                      mt: 1
                    }}>
                    <Button
                      onClick={() => handleClickOpen(instrument)}
                      color="primary"
                      sx={{
                        borderRadius: 20,
                        border: "1px solid green",
                        bgcolor: "#eeea"
                      }}
                    >
                      <ModeEdit sx={{ color: "#2f2", fontSize: "12px" }} />
                    </Button>
                    <Button
                      onClick={() => handleOpenDialog(instrument)}
                      sx={{
                        borderRadius: 20,
                        border: "1px solid red",
                        bgcolor: "#eeea"
                      }}
                    >
                      <DeleteOutline sx={{ color: "#f22", fontSize: "12px" }} />
                    </Button>

                  </DialogActions>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog open={open} onClose={handleClose}>

        <Typography variant="h4" fontFamily="Roboto"
          sx={{ p: 2 }}>
          {isEditMode ? "Edit Instrument" : "Add Instrument"}
        </Typography>
        <DialogContent>
          <TextField
            autoFocus
            label="Instrument Name"
            type="text"
            fullWidth
            value={newInstrument?.name}
            onChange={handleChange}
            sx={getTextFieldStyle()}
          />
          {error && <div style={{ color: "red" }}>{error}</div>}
          <DialogActions>
            <Button onClick={handleClose}
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
            <Button onClick={(e) => handleAddInstrument(e)}
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
            Do you really want to delete this instrument?
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

export default Instrument;
