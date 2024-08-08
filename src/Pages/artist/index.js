import React, { useState } from "react";
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
  Paper,
  Box,
  Menu,
  MenuItem,
  CardMedia,
} from "@mui/material";
import { Add, Close } from "@mui/icons-material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import data from "../../Data/Artist.json";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Artist = () => {
  const [artists, setArtists] = useState(data);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate('');
  const open = Boolean(anchorEl);

  const GreenTableCell = styled(TableCell)`
  color: green;
  font-size: 16px;
`;

  const handleAddArtist = () => {
    setSelectedArtist(null);
    setIsModalOpen(true);
  };

  const handleEditArtist = (artist) => {
    setAnchorEl(null);
    setSelectedArtist(artist);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveArtist = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);

    const newArtist = {
      idArtist: form.get("idArtist"),
      nameArtist: form.get("nameArtist"),
      rating: parseFloat(form.get("rating")),
      createdate: form.get("createdate"),
      total_music: JSON.parse(form.get("total_music")),
    };

    if (selectedArtist) {
      setArtists(
        artists.map((artist) =>
          artist.idArtist === selectedArtist.idArtist ? newArtist : artist
        )
      );
    } else {
      setArtists([...artists, newArtist]);
    }

    setIsModalOpen(false);
    setSnackbarMessage("Artist saved successfully");
    setSnackbarOpen(true);
  };

  const handleDeleteArtist = (id) => {
    setAnchorEl(null);
    setArtists(artists.filter((artist) => artist.idArtist !== id));

  };

  const handleClick = (event, artist) => {
    setSelectedArtist(artist);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedArtist(null);
  };

  const handleClickDetail = (artist) => {
    navigate(`${artist.idArtist}`, {
      state: {
        ...selectedArtist
      }
    })

  };

  return (
    <div style={{ minHeight: "92vh", backgroundSize: "cover", padding: 0 }}>
      <main style={{ padding: 24, margin: "24px auto", background: "rgba(255, 255, 255, 0.9)", borderRadius: "8px", maxWidth: 1200 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Manage Artist
        </Typography>

        <Button
          variant="contained"

          startIcon={<Add />}
          onClick={handleAddArtist}
          sx={{ mb: 2, color: 'black', backgroundColor: '#2ECBFF', fontWeight: 'bold' }}
        >
          New Artist
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <GreenTableCell>Avatar</GreenTableCell>
                <GreenTableCell>Name</GreenTableCell>
                <GreenTableCell>Songs</GreenTableCell>
                <GreenTableCell>Actions</GreenTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {artists.map((artist) => (
                <TableRow key={artist.idArtist}>
                  <TableCell>
                    <CardMedia
                      component="img"
                      image={artist.avarta}
                      alt={artist.nameArtist}
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '17px' }}>{artist.nameArtist}</TableCell>
                  <TableCell sx={{ fontSize: '15px' }}>{artist.total_music.length} songs</TableCell>
                  <TableCell sx={{ fontSize: '20px' }}>
                    <Typography
                      fontWeight="600"
                      fontSize="20px"
                      onClick={(event) => handleClick(event, artist)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <MoreHorizIcon />
                    </Typography>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && selectedArtist?.idArtist === artist.idArtist}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={() => handleClickDetail(artist)}>Detail</MenuItem>
                      <MenuItem onClick={() => handleEditArtist(artist)}>Edit</MenuItem>
                      <MenuItem onClick={() => handleDeleteArtist(artist.idArtist)}>Delete</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal open={isModalOpen} onClose={handleCloseModal}>
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
              p: 4,
            }}
          >
            <Typography variant="h6" gutterBottom>
              {selectedArtist ? "Edit Artist" : "Add New Artist"}
            </Typography>
            <form onSubmit={handleSaveArtist}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Artist ID"
                  name="idArtist"
                  defaultValue={selectedArtist ? selectedArtist.idArtist : ""}
                  required
                  fullWidth
                  disabled={!!selectedArtist}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Artist Name"
                  name="nameArtist"
                  defaultValue={selectedArtist ? selectedArtist.nameArtist : ""}
                  required
                  fullWidth
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Rating"
                  name="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  defaultValue={selectedArtist ? selectedArtist.rating : ""}
                  required
                  fullWidth
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Created Date"
                  name="createdate"
                  type="date"
                  defaultValue={selectedArtist ? selectedArtist.createdate : ""}
                  required
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Total Music"
                  name="total_music"
                  defaultValue={
                    selectedArtist
                      ? JSON.stringify(selectedArtist.total_music)
                      : "[]"
                  }
                  required
                  fullWidth
                  multiline
                  rows={4}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Save Artist
              </Button>
            </form>
          </Box>
        </Modal>
      </main>
    </div>
  );
};

export default Artist;
