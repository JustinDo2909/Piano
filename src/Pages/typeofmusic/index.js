import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addGenre,
  deleteGenre,
  setGenres,
  updateGenre,
} from "../../Redux/reducers/musicReducer";
import TypeData from "../../Data/TypeMusic.json";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Upload as UploadIcon,
} from "@mui/icons-material";
import backGround from "../../image/3766921.jpg";
import {
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  Typography,
  Modal,
  Grid,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const TypeMusic = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.music.genres);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingGenre, setEditingGenre] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [form, setForm] = useState({
    nameTypeMusic: "",
    description: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setGenres(TypeData));
  }, [dispatch]);

  const showModal = (genre) => {
    setEditingGenre(genre);
    setImageUrl(genre ? genre.backgroundImage : "");
    setForm({
      nameTypeMusic: genre ? genre.nameTypeMusic : "",
      description: genre ? genre.description : "",
    });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const genreData = {
      ...form,
      createdate: new Date().toISOString().split("T")[0],
      NumberOfPlayed: "0",
      backgroundImage: imageUrl,
    };
    if (editingGenre) {
      dispatch(
        updateGenre({ idTypeMusic: editingGenre.idTypeMusic, ...genreData })
      );
    } else {
      dispatch(addGenre({ idTypeMusic: Date.now(), ...genreData }));
    }
    setIsModalVisible(false);
    setEditingGenre(null);
    setImageUrl("");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingGenre(null);
    setImageUrl("");
  };

  const handleDelete = (idTypeMusic) => {
    dispatch(deleteGenre(idTypeMusic));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageUrl(reader.result);
    };
  };

  // const uploadProps = {
  //   beforeUpload: (file) => {
  //     const isJpg = file.type === "image/jpeg";
  //     if (!isJpg) {
  //       message.error("You can only upload JPG files!");
  //     }
  //     return isJpg;
  //   },
  //   onChange: handleImageChange,
  //   showUploadList: false,
  // };

  const handleDetail = (item) => {
    navigate(`${item.idTypeMusic}`, {
      state: {
        name: item.nameTypeMusic,
      },
    });
  };

  const genresList = [
    { id: 1, name: "Pop" },
    { id: 2, name: "Rock" },
    { id: 3, name: "Jazz" },
    { id: 4, name: "Classical" },
    { id: 5, name: "Hip Hop" },
    { id: 6, name: "Electronic" },
  ];

  return (
    <Box
      p="1rem 1.5rem"
      height="92vh"
      sx={{
        background: `url(${backGround}) no-repeat center center fixed`,
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          background: "rgba(255, 255, 255, 0.5)",
          borderRadius: 8,
          padding: "1rem",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Manage Music Genres
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => showModal(null)}
          sx={{ marginBottom: 2, borderRadius: 4 }}
        >
          Add Genre
        </Button>
        <Grid container spacing={2}>
          {genres.map((item) => (
            <Grid item key={item.idTypeMusic} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  position: "relative",
                  background: `url(${item.backgroundImage}) no-repeat center center`,
                  backgroundSize: "cover",
                  color: "#fff",
                  height: "100%",
                  overflow: "hidden",
                  cursor: "pointer",
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
                <CardContent sx={{ position: "relative", zIndex: 2 }}>
                  <Typography variant="h5" gutterBottom>
                    {item.nameTypeMusic}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {item.description}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Number of Plays:</strong> {item.NumberOfPlayed}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Created Date:</strong>{" "}
                    {new Date(item.createdate).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    position: "relative",
                    zIndex: 2,
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => showModal(item)}
                    sx={{ color: "#fff" }}
                  />
                  <Button
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(item.idTypeMusic)}
                    sx={{ color: "#fff" }}
                  />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Modal
          open={isModalVisible}
          onClose={handleCancel}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Paper
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" component="h2">
              {editingGenre ? "Edit Genre" : "Add Genre"}
            </Typography>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                label="Genre Name"
                value={form.nameTypeMusic}
                onChange={(e) =>
                  setForm({ ...form, nameTypeMusic: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Description"
                multiline
                fullWidth
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              <Button variant="contained" component="label" sx={{ m: 1 }}>
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/jpeg"
                  onChange={handleImageChange}
                />
              </Button>
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  style={{ marginTop: 16, maxHeight: 200 }}
                />
              )}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button onClick={handleCancel} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button onClick={handleOk} variant="contained">
                {editingGenre ? "Update" : "Add"}
              </Button>
            </Box>
          </Paper>
        </Modal>
      </Box>
    </Box>
  );
};

export default TypeMusic;
