// import React, { useState } from "react";
// import NoteSelector from "../../components/NoteSelector";
// import SheetEditor from "../../components/SheetEditor";
// import "./abcjs-audio.css";
// import "./sheet.css"
// import { useSelector } from "react-redux";
// const Sheet = () => {
//   const sheet = useSelector((state) => state.sheets.sheets)
//   const [Rightnotes, setRightNotes] = useState([]);
//   const [Leftnotes, setLeftNotes] = useState([]);
//   const [topSignature, setTopSignature] = useState(sheet.topSignature);
//   const [bottomSignature, setBottomSignature] = useState(sheet.bottomSignature);
//   const [instrumentId, setInstrumentId] = useState(sheet.instrumentId);
//   const [songId, setSongId] = useState(sheet.songId);
//   const [isRighthand, setIsRighthand] = useState(true);
//   const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);

//   const handleAddNote = (note) => {
//     if (isRighthand) {
//       setRightNotes([...Rightnotes, note]);
//     } else {
//       setLeftNotes([...Leftnotes, note]);
//     }
//   };

//   const handleAddBar = () => {
//     if (isRighthand) {
//       setRightNotes([...Rightnotes, "|"]);
//     } else {
//       setLeftNotes([...Leftnotes, "|"]);
//     }
//   };

//   const handleNewLine = () => {
//     if (isRighthand) {
//       setRightNotes([...Rightnotes, "\n"]);
//     } else {
//       setLeftNotes([...Leftnotes, "\n"]);
//     }
//   };

//   const handleRemoveLastNote = () => {
//     if (isRighthand) {
//       setRightNotes(Rightnotes.slice(0, -1));
//     } else {
//       setLeftNotes(Leftnotes.slice(0, -1));
//     }
//   };
//   const handleDeleteNote = (index) => {
//     if (isRighthand) {
//       setRightNotes(Rightnotes.filter((_, i) => i !== index));
//     } else {
//       setLeftNotes(Leftnotes.filter((_, i) => i !== index));
//     }
//   };

//   const handleUpdateNote = (index, newNote) => {
//     if (isRighthand) {
//       setRightNotes(
//         Rightnotes.map((note, i) => (i === index ? newNote : note))
//       );
//     } else {
//       setLeftNotes(Leftnotes.map((note, i) => (i === index ? newNote : note)));
//     }
//   };


  
//   return (
//     <div className="App">
//       <h1>Music Sheet Creator</h1>
//       {console.log(sheet)}
//       <div>
//         <label>
//           Top Signature:
//           <input
//             type="number"
//             value={topSignature}
//             onChange={(e) => setTopSignature(e.target.value)}
//           />
//         </label>
//         <label>
//           Bottom Signature:
//           <input
//             type="number"
//             value={bottomSignature}
//             onChange={(e) => setBottomSignature(e.target.value)}
//           />
//         </label>
//       </div>
//       <button onClick={() => setIsRighthand(!isRighthand)}>
//         {isRighthand ? "Right Hand" : "Left Hand"}
//       </button>
//       <NoteSelector
//         onAddNote={handleAddNote}
//         onAddBar={handleAddBar}
//         onAddNewLine={handleNewLine}
//         onRemoveLastNote={handleRemoveLastNote}
//       />
//       <SheetEditor
//         Rightnotes={Rightnotes}
//         Leftnotes={Leftnotes}
//         topSignature={topSignature}
//         bottomSignature={bottomSignature}
//         instrumentId= {instrumentId}
//         songId = {songId}
//         selectedNoteIndex={selectedNoteIndex}
//         onDeleteNote={handleDeleteNote}
//         onSelectNote={(index) => setSelectedNoteIndex(index)}
//         onUpdateNote={handleUpdateNote}
//       />
//       <div id="audio"></div>
//     </div>
//   );
// };

// export default Sheet;
