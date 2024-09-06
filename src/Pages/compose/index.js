import React, { useEffect, useState } from "react";
import MusicConverter from '../../components/MusicConverter';
import "../sheet/abcjs-audio.css";
import { AddMxlFile, AddSheetSymbol, getInstrument, getMySong } from "../../util/ApiFunction";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { SnackBar } from "../../components/Snackbar";

const LEVELS = [0, 1, 2]; // Moved outside of component

const Compose = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });
  const [song, setSong] = useState([]);
  const [instrument, setInstrument] = useState([]);
  const [songSelected, setSongSelected] = useState('');
  const [levelSelected, setLevelSelected] = useState('');
  const [instrumentSelected, setInstrumentSelected] = useState('');
  const [topSignature, setTopSignature] = useState('');
  const [bottomSignature, setBottomSignature] = useState('');
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [KeySignature, setKeySignature] = useState('');
  const [mxlFile , setMxlFile] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const songResponse = await getMySong();
        if (songResponse.statusCode === 200) {
          setSong(songResponse.data);
        }
        const instrumentResponse = await getInstrument();
        if (instrumentResponse.statusCode === 200) {
          setInstrument(instrumentResponse.data);
        }
      } catch (error) {
        setSnackbar({ open: true, message: 'Failed to fetch data', type: 'error' });
      }
    };
    fetchData();
  }, []);

  const handleImageUploadChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setImage(file);
    } else {
      setSnackbar({ open: true, message: 'You need to upload a JPEG or PNG file!', type: 'error' });
    }
  };

  const handleMxlFileUploadChange = (event) => {
    const file = event.target.files[0];
      setMxlFile(file);
  };

  const handleSave = async() => {
    // // // const t = songSelected
    const RightSymbol = localStorage.getItem('RightSymbol')
    const LeftSymbol = localStorage.getItem('LeftSymbol')
    const respone = await AddSheetSymbol(songSelected, instrumentSelected, title ,levelSelected,KeySignature ,topSignature, bottomSignature,RightSymbol ,LeftSymbol, mxlFile,image)
    console.log(respone)
    console.log('Right : ' ,RightSymbol ,'Left : ', LeftSymbol)
    if(respone.status === 200){
      setSnackbar({ open: true, message: 'Upload Success!', type: 'success' });
      window.location.reload()
    }else{
      setSnackbar({ open: true, message: 'Upload Fail !', type: 'error' });
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>MusicXML to ABC Converter</h1>
      </header>
      {console.log(songSelected, levelSelected, instrumentSelected, topSignature, bottomSignature, image, mxlFile)}
      <main>
        <Select
          value={songSelected}
          onChange={(e) => setSongSelected(e.target.value)}
          displayEmpty
          required
        >
          <MenuItem value="" disabled>Select Song</MenuItem>
          {song.map((song) => (
            <MenuItem key={song.id} value={song.id}>
              {song.title}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={instrumentSelected}
          onChange={(e) => setInstrumentSelected(e.target.value)}
          displayEmpty
          required
        >
          <MenuItem value="" disabled>Select Instrument</MenuItem>
          {instrument.map((type) => (
            <MenuItem key={type.id} value={type.id}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={levelSelected}
          onChange={(e) => setLevelSelected(e.target.value)}
          displayEmpty
          required
        >
          <MenuItem value="" disabled>Select Level</MenuItem>
          {LEVELS.map((level) => (
            <MenuItem key={level} value={level}>
              {level === 0 ? 'Easy' : level === 1 ? 'Normal' : 'Hard'}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Title"
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Key Signature"
          value={KeySignature || ""}
          onChange={(e) => setKeySignature(e.target.value)}
          required
        />
        <TextField
          label="Top Signature"
          value={topSignature || ""}
          onChange={(e) => setTopSignature(e.target.value)}
          required
        />
        <TextField
          label="Bottom Signature"
          value={bottomSignature || ""}
          onChange={(e) => setBottomSignature(e.target.value)}
          required
        />
        <div style={{ marginTop: 8, display: "block" }}>
          <label
            htmlFor="background-image-upload"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: "#001529",
              color: "white",
              fontSize: "14px",
              fontWeight: "bold",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Upload Background Image
          </label>
          <input
            id="background-image-upload"
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleImageUploadChange}
            style={{ display: "none" }}
          />
           <label
        htmlFor="mxl-upload"
        style={{
          display: "inline-block",
          padding: "10px 20px",
          backgroundColor: "#001529",
          color: "white",
          fontSize: "14px",
          fontWeight: "bold",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: '10px'
        }}
      >
        Upload MXL file
      </label>
      <input
        id="mxl-upload"
        type="file"
        accept=".xml, .mxl"
        onChange={handleMxlFileUploadChange}
        style={{ display: "none" }}
      />
        </div>
        <MusicConverter
        mxlFile = {mxlFile}
        />
        <div id="audio"></div>
        <Button onClick={handleSave} variant="contained" >
          Save
        </Button>
      </main> 
      <SnackBar
        open={snackbar.open}
        type={snackbar.type}
        message={snackbar.message}
        handleClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
};

export default Compose;
