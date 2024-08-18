import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getSong } from "../../Redux/reducers/songsSlice";
import { AddSheetMidi } from "../../util/ApiFunction";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Compose = () => {
  const [outputLeft, setOutputLeft] = useState("");
  const [outputRight, setOutputRight] = useState("");
  const [parsedMidi, setParsedMidi] = useState(null);
  const [speed, setSpeed] = useState(1);
  const [selectedSong, setSelectedSong] = useState(""); // Initialize with an empty string
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isAudioContextStarted, setIsAudioContextStarted] = useState(false);
  const [topSignature, setTopSignature] = useState("");
  const [bottomSignature, setBottomSignature] = useState("");
  const [instrumentId, setInstrumentId] = useState("");
  const [songSelectedData , setSongSelectedData] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const navigate = useNavigate('')

  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.songs);

  const [sampleSongs, setSampleSongs] = useState({
    composer: "",
    createdTime: "",
    genres: [],
    SongId: "",
    image: "",  
    lastUpdatedTime: "",
    title: "",
    TopSignature: "",
    BottomSignature: "",
    InstrumentId: "",
    SheetFile:""
  });

  useEffect(() => {
    if (songs.data && selectedSong) {
      const foundSong = songs.data.find((song) => song.title === selectedSong);
      if (foundSong) {
        setSongSelectedData(foundSong);
      } else {
        console.log("Song not found");
      }
    }
  }, [songs.data, selectedSong]);
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
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
        
        // Convert file to Base64 string
        // const base64String = btoa(
        //   new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
        // );
        // setUploadedFile(base64String);
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

  const handleSaveFile = async() => {
    if (selectedSong && uploadedFile) {
      const topSignatureInt = parseInt(topSignature, 10) || 0;
      const bottomSignatureInt = parseInt(bottomSignature, 10) || 0;
      const instrumentIdInt = parseInt(instrumentId, 10) || 0;
      
      const response = await AddSheetMidi(
        songSelectedData.id,
        instrumentIdInt,
        topSignatureInt,
        bottomSignatureInt,
        uploadedFile
      );
      
      if (response) {
        console.log(response);
        // Handle success response here
      }
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

  const handleStartAudioContext = async () => {
   navigate('/Sheet')
  };

  const handlePlayMusic = async () => {
    if (!isAudioContextStarted) {
      alert("Please start the audio context first.");
      return;
    }

    try {
      const leftHandSynth = new Tone.Synth().toDestination();
      const rightHandSynth = new Tone.Synth().toDestination();

      playNotes(outputLeft, leftHandSynth);
      playNotes(outputRight, rightHandSynth);
    } catch (error) {
      console.error("Failed to play music", error);
    }
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
      {console.log(sampleSongs)}
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
                  value={selectedSong || ""}
                  onChange={(e) => setSelectedSong(e.target.value)}
                  label="Select a song"
                  sx={{ color: "white" }}
                >
                  <MenuItem value="" disabled>Select a song</MenuItem>
                  {songs.data.map((song) => (
                    <MenuItem key={song.title} value={song.title}>
                      <span
                        style={{
                          color: localStorage.getItem(song.name)
                            ? "green"
                            : "red",
                        }}
                      >
                        {song.title}
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
         
          <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Top Signature"
                type="number"
                fullWidth
                value={topSignature}
                onChange={(e) => setTopSignature(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Bottom Signature"
                type="number"
                fullWidth
                value={bottomSignature}
                onChange={(e) => setBottomSignature(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Instrument ID"
                type="text"
                fullWidth
                value={instrumentId}
                onChange={(e) => setInstrumentId(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
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
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleStartAudioContext}
                sx={{
                  backgroundColor: "#fff",
                  color: "#001529",
                  "&:hover": {
                    backgroundColor: "#001529",
                    color: "#fff",
                  },
                }}
              >
                Add Sheet Music
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Compose;
