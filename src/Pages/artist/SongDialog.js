import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
} from "@mui/material";

const SongDialog = ({
  open,
  handleClose,
  song,
  artists,
  handleConfirmSong,
  isEditMode,
  handleChange,
  genres,
}) => {
  const [imagePreview, setImagePreview] = useState(song?.image || "");

  // useEffect(() => {
  //   if (isEditMode && song?.image) {
  //     setImagePreview(`data:image/*;base64,${song.image}`);
  //   }
  // }, [isEditMode, song]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(file); 
      handleChange({
        target: {
          name: "image",
          value: file, 
        },
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleConfirmSong(event);
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
    <Dialog
      open={open}
      onClose={() => {
        handleClose();
        setImagePreview("");
      }}
      sx={{ boxSizing: "border-box" }}
    >
      <Typography variant="h4" fontFamily="Roboto"
        sx={{ p: 2 }}>
        {isEditMode ? "Update Song" : "Add Song"}
      </Typography>
      <DialogContent
        sx={{ p: "0 auto" }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Title"
            name="title"
            value={song?.title || ""}
            onChange={handleChange}
            fullWidth
            required
            sx={getTextFieldStyle()}
          />
          <TextField
            label="Composer"
            name="composer"
            value={song?.composer || ""}
            onChange={handleChange}
            fullWidth
            required
            sx={getTextFieldStyle()}
          />

          {/* Select Artist Dropdown */}
          <TextField
            select
            label="Select Artist"
            name="artistId"
            value={song?.artistId || ""}
            onChange={handleChange}
            fullWidth
            required
            sx={getTextFieldStyle()}
          >
            {artists.map((artist) => (
              <MenuItem key={artist.id} value={artist.id}>
                {artist.id} - {artist.name ? artist.name : "Unknown"}
              </MenuItem>
            ))}
          </TextField>

          {/* Select Artist Dropdown */}
          <TextField
            select
            label="Select Genre"
            name="genreId"
            value={song?.genreId || ""}
            onChange={handleChange}
            fullWidth
            required
            sx={getTextFieldStyle()}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.id} - {genre.name}
              </MenuItem>
            ))}
          </TextField>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: "1rem" }}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Selected"
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                marginBottom: 8,
              }}
            />
          )}
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={(e) => handleSubmit(e)}
          sx={{
            mt: 2,
            bgcolor: "#211f65",
            color: "#eee",
            "&:hover": {
              backgroundColor: "#0f0e38",
              color: "#fff",
            },
          }}
        >
          {isEditMode ? "Update Song" : "Add Song"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SongDialog;
