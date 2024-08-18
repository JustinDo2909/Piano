import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addGenre,
  deleteGenre,
  setGenres,
  updateGenre,
} from "../../Redux/reducers/musicReducer";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GetAllGenre } from "../../util/ApiFunction";
import { getType } from "../../Redux/reducers/typeSlice";

const TypeMusic = ({isSidebarOpen, setIsSidebarOpen}) => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingGenre, setEditingGenre] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [addClick, setAddClick] = useState(false);
  const [typeOfArtist, setTypeOfArtist] = useState([]);
  const [form, setForm] = useState({
    nameTypeMusic: "",
    description: "",
  });
  const dispatch = useDispatch();
  const TypeData = useSelector((state) => state.types.types);
 
  const getgenre = GetAllGenre();
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getgenre();
        if (data !== null) {
          dispatch(getType(data.data));
        }
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, [dispatch]);

  const showModal = (genre) => {
    setEditingGenre(genre);
    setImageUrl(genre ? genre.backgroundImage : "");
    setForm({
      nameTypeMusic: genre ? genre.name : "",
      description: genre ? genre.description : "",
    });
    setIsModalVisible(true);
  };

  const handleAddClick = () => {
    // setIsSidebarOpen(!isSidebarOpen);
    
    setAddClick(true);
    setIsModalVisible(true);
  }

  const handleOk = () => {
    if (form.nameTypeMusic) {
      const selectedType = TypeData.find(type => type.name === form.nameTypeMusic);
      const genreExists = typeOfArtist.some(item => item.nameTypeMusic === form.nameTypeMusic);
  
      if (addClick) {
        // Add new genre logic
        if (genreExists) {
          alert("This genre already exists."); 
          return;
        }
  
        const newGenre = {
          ...form,
          description: selectedType ? selectedType.description : form.description,
          backgroundImage: imageUrl,
          idTypeMusic: Date.now(),
          createdate: new Date().toISOString().split("T")[0],
          NumberOfPlayed: "0",
        };
        setTypeOfArtist([...typeOfArtist, newGenre]);
        dispatch(addGenre(newGenre));
      } else if (editingGenre) {
        // Update existing genre logic
        const genreData = {
          ...form,
          backgroundImage: imageUrl,
        };
        setTypeOfArtist(...typeOfArtist , genreData)
      }
  
      setIsModalVisible(false);
      setEditingGenre(null);
      setImageUrl("");
      setForm({
        nameTypeMusic: "",
        description: "",
      });
    } else {
      alert("Please enter a genre name."); 
    }
  };
  

  const handleCancel = () => {
    setAddClick(false);
    setIsModalVisible(false);
    setEditingGenre(null);
    setImageUrl("");
    setForm({
      nameTypeMusic: "",
      description: "",
    });
  };

  const handleDelete = (idTypeMusic) => {
    dispatch(deleteGenre(idTypeMusic));
    setTypeOfArtist(typeOfArtist.filter((item) => item.idTypeMusic !== idTypeMusic));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageUrl(reader.result);
    };
  };

  const handleDetail = (item) => {
    navigate(`${item.idTypeMusic}`, {
      state: {
        name: item.nameTypeMusic,
      },
    });
  };

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
          onClick={handleAddClick}
          sx={{ marginBottom: 2, borderRadius: 4 }}
        >
          Add Genre
        </Button>
        <Grid container spacing={2}>
          {typeOfArtist.map((item) => (
            <Grid item key={item.idTypeMusic} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  position: "relative",
                  background: `url(${backGround}) no-repeat center center`,
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
                  {/* <Button
                    startIcon={<EditIcon />}
                    onClick={() => showModal(item)}
                    sx={{ color: "#fff" }}
                  /> */}
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
              {addClick ? (
                <>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Genres</InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={form.nameTypeMusic}
                      label="Genres"
                      onChange={(e) => {
                        const selectedGenre = e.target.value;
                        const selectedType = TypeData.find(type => type.name === selectedGenre);
                        setForm({
                          ...form,
                          nameTypeMusic: selectedGenre,
                          description: selectedType ? selectedType.description : ''
                        });
                      }}
                    >
                      {TypeData.map((type) => (
                        <MenuItem key={type.id} value={type.name}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>With label + helper text</FormHelperText>
                  </FormControl>
                  <TextField
                    label="Description"
                    multiline
                    fullWidth
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  />
                </>
              ) : (
                <>
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
                </>
              )}
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
