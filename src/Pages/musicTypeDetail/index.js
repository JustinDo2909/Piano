import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MusicData from '../../Data/Music.json';
import {
  Chip, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Link, IconButton, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Button
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';

const MusicTypeDetail = () => {
  const location = useLocation();
  const typeName = location.state || {};
  const [list, setList] = useState([]);
  const [selectedType, setSelectedType] = useState(typeName.name || '');
  const [types, setTypes] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedItem, setEditedItem] = useState(null);

  const open = Boolean(anchorEl);

  useEffect(() => {
    const uniqueTypes = [...new Set(MusicData.map((music) => music.type))];
    setTypes(uniqueTypes);
  }, []);

  useEffect(() => {
    if (selectedType) {
      const listSort = MusicData.filter((music) => music.type === selectedType);
      setList(listSort);
    }
  }, [selectedType]);

  const handleClick = (type) => {
    setSelectedType(type);
  };

  const handleClickMore = (event, item) => {
    setAnchorEl(event.currentTarget);
    setCurrentItem(item);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenEditDialog(false);
  };

  const handleOpenEditDialog = () => {
    if (currentItem) {
      setEditedItem({ ...currentItem });
      setOpenEditDialog(true);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    const [field, nestedField] = name.split('.');
    setEditedItem(prevState => ({
      ...prevState,
      [field]: nestedField ? { ...prevState[field], [nestedField]: value } : value
    }));
  };

  const handleSaveEdit = () => {
    if (editedItem) {
      const updatedList = list.map(item =>
        item.idMusic === editedItem.idMusic ? editedItem : item
      );
      setList(updatedList);
      handleClose();
    }
  };

  const handleDeleteItem = (id) => {
    const updatedList = list.filter(item => item.idMusic !== id);
    setList(updatedList);
    handleClose();
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Link
        href="/typeofmusic"
        sx={{ mb: 2, fontSize: '15px', textDecoration: 'none', color: 'inherit' }}
      >
        Back
      </Link>
      <Typography variant="h4" gutterBottom sx={{ color: '#ff4081' }}>
        Music Types
      </Typography>
      <div style={{ marginBottom: 16 }}>
        {types.map((type, index) => (
          <Chip
            key={index}
            label={type}
            clickable
            color={selectedType === type ? 'secondary' : 'default'}
            onClick={() => handleClick(type)}
            style={{
              margin: 4,
              padding: '12px 24px',
              fontSize: '1.2rem',
              backgroundColor: selectedType === type ? '#ff4081' : '#f0f0f0',
              color: selectedType === type ? '#fff' : '#000',
            }}
          />
        ))}
      </div>
      <Typography variant="h6" gutterBottom sx={{ color: '#303f9f' }}>
        {selectedType ? `Music of type: ${selectedType}` : 'Select a type to see the music'}
      </Typography>
      {list.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#e1bee7' }}>
                <TableCell>No</TableCell>
                <TableCell>Name of Music</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Plays</TableCell>
                <TableCell>Artist</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((item, index) => (
                <TableRow key={item.idMusic}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.nameMusic}</TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>{item.NumberOfPlayed.toLocaleString()}</TableCell>
                  <TableCell>{item.artist.nameArtist}</TableCell>
                  <TableCell>
                    <IconButton onClick={(event) => handleClickMore(event, item)}>
                      <MoreVert />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && currentItem?.idMusic === item.idMusic}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleOpenEditDialog}>Edit</MenuItem>
                      <MenuItem onClick={() => handleDeleteItem(item.idMusic)}>Delete</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" sx={{ color: '#ff4081' }}>
          No music found for this type.
        </Typography>
      )}

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleClose}>
        <DialogTitle>Edit Music</DialogTitle>
        <DialogContent>
          {editedItem && (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                name="nameMusic"
                value={editedItem.nameMusic || ''}
                onChange={handleEditChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Author"
                type="text"
                fullWidth
                variant="outlined"
                name="author"
                value={editedItem.author || ''}
                onChange={handleEditChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Plays"
                type="number"
                fullWidth
                variant="outlined"
                name="NumberOfPlayed"
                value={editedItem.NumberOfPlayed || ''}
                onChange={handleEditChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Artist"
                type="text"
                fullWidth
                variant="outlined"
                name="artist.nameArtist"
                value={editedItem.artist?.nameArtist || ''}
                onChange={handleEditChange}
                sx={{ mb: 2 }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MusicTypeDetail;