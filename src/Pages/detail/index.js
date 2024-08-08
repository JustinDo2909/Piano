import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

const Detail = () => {
  const artist = useLocation().state;

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '30%' }}>
      <img
        width={'100%'}
        height={'100%'}
        src='https://wallpapercave.com/wp/wp3279344.jpg'
        alt={artist.nameArtist}
        style={{ display: 'block', objectFit: 'cover' }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          color: 'white',
          background: 'rgba(0, 0, 0, 0.5)', // Optional: adds a semi-transparent background to enhance readability
          padding: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontSize: '40px', fontWeight: 'bold', mb: 1 }}>
          {artist.nameArtist}
        </Typography>
        <Typography variant="h5">
          Number of music: {artist.total_music.length}
        </Typography>
      </Box>

      <TableContainer  sx={{ width: '30%', mt: 4 }}>
        <Table sx={{ borderCollapse: 'collapse' }}>
          <TableBody>
            {artist.total_music.map((music) => (
              <TableRow key={music.idMusic} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={{ border: 'none', fontSize:'15px' }}>{music.idMusic}</TableCell>
                <TableCell sx={{ border: 'none', fontSize:'15px' }}>{music.nameMusic}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Detail;
