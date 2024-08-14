

import React, { useState } from "react";
import {
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  CardMedia,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import {
  Upload as UploadIcon,
  PlayCircle as PlayCircleIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import * as Tone from "tone";
import { parseMidiFile, parsedMidiToCustomFormat } from "./midiConverter";
import backGround from "../../image/3766921.jpg";

const { Title, Text } = Typography;

const sampleSongs = [
  { name: "Song A" },
  { name: "Song B" },
  { name: "Song C" },
];

const Compose = () => {
  const [outputLeft, setOutputLeft] = useState("");
  const [outputRight, setOutputRight] = useState("");
  const [parsedMidi, setParsedMidi] = useState(null);
  const [speed, setSpeed] = useState(1);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      const midi = new Uint8Array(arrayBuffer);
      try {
        const parsed = parseMidiFile(midi);
        setParsedMidi(parsed);

        const { leftHand, rightHand } = parsedMidiToCustomFormat(parsed);
        setOutputLeft(leftHand);
        setOutputRight(rightHand);
        setIsFileUploaded(true);
      } catch (error) {
        alert("Failed to parse MIDI file.");
      }
    };

    reader.onerror = () => {
      alert("Failed to read file.");
    };

    reader.readAsArrayBuffer(file);
  };

  const handleDeleteFile = () => {
    setOutputLeft("");
    setOutputRight("");
    setParsedMidi(null);
    setIsFileUploaded(false);
    alert("MIDI file removed.");
  };

  const handleSaveFile = () => {
    if (outputLeft && outputRight && selectedSong) {
      const songData = {
        leftHand: outputLeft,
        rightHand: outputRight,
      };
      localStorage.setItem(selectedSong, JSON.stringify(songData));
      alert(`Notes saved to ${selectedSong}.`);
    } else {
      alert("No notes to save or no song selected.");
    }
  };

  const parseNote = (note) => {
    const [pitch, duration] = note.split("_");
    return { pitch, duration: parseFloat(duration) };
  };

  const playNotes = (notes, instrument) => {
    let currentTime = Tone.now();

    notes.split(" / ").forEach((measure) => {
      let measureStartTime = currentTime;

      measure.split(" ").forEach((noteStr) => {
        if (noteStr.trim() !== "") {
          const { pitch, duration } = parseNote(noteStr);
          if (!isNaN(duration)) {
            instrument.triggerAttackRelease(
              pitch,
              duration / speed,
              measureStartTime
            );
            measureStartTime += duration / speed;

            if (measureStartTime <= currentTime) {
              measureStartTime = currentTime + 0.001;
            }
          }
        }
      });

      currentTime = measureStartTime;
    });
  };

  const handlePlayMusic = async () => {
    await Tone.start();
    const leftHandSynth = new Tone.Synth().toDestination();
    const rightHandSynth = new Tone.Synth().toDestination();

    playNotes(outputLeft, leftHandSynth);
    playNotes(outputRight, rightHandSynth);
  };

  return (
    <Box
      sx={{
        height: "100%",
        backgroundImage: `url(${backGround})`,
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px",
        
      }}
    >
      <Card
        sx={{
          maxWidth: "50%",
          width: '50%',
          margin: "auto",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          backgroundColor: "white",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "#001529" }}
          >
            MIDI Converter
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: "white" }}>Select a song</InputLabel>
                <Select
                  value={selectedSong}
                  onChange={(e) => setSelectedSong(e.target.value)}
                  label="Select a song"
                  sx={{ color: "white" }}
                >
                  {sampleSongs.map((song) => (
                    <MenuItem key={song.name} value={song.name}>
                      <span
                        style={{
                          color: localStorage.getItem(song.name)
                            ? "green"
                            : "red",
                        }}
                      >
                        {song.name}
                      </span>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                component="label"
                startIcon={<UploadIcon />}
                fullWidth
                disabled={!selectedSong}
                sx={{
                  backgroundColor: "#fff",
                  color: "#001529",
                  "&:hover": {
                    backgroundColor: "#001529",
                    color: "#fff",
                  },
                }}
              >
                Upload MIDI File
                <input
                  type="file"
                  accept=".mid"
                  hidden
                  onChange={handleFileUpload}
                />
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ marginTop: 2 }}
          >
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                startIcon={<PlayCircleIcon />}
                fullWidth
                onClick={handlePlayMusic}
                disabled={!isFileUploaded}
                sx={{
                  backgroundColor: "#fff",
                  color: "#001529",
                  "&:hover": {
                    backgroundColor: "#001529",
                    color: "#fff",
                  },
                }}
              >
                Play
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                fullWidth
                onClick={handleDeleteFile}
                disabled={!isFileUploaded}
                sx={{
                  backgroundColor: "#fff",
                  color: "#001529",
                  "&:hover": {
                    backgroundColor: "#001529",
                    color: "#fff",
                  },
                }}
              >
                Delete
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                fullWidth
                onClick={handleSaveFile}
                disabled={!isFileUploaded || !selectedSong}
                sx={{
                  backgroundColor: "#fff",
                  color: "#001529",
                  "&:hover": {
                    backgroundColor: "#001529",
                    color: "#fff",
                  },
                }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ marginTop: 2 }}
          >
          </Grid>
         
        </CardContent>
      </Card>
    </Box>
  );
};

export default Compose;
