// import React, { useRef, useEffect, useState } from 'react';
// import { Stave, StaveNote, Formatter, Voice, Renderer, StaveConnector } from 'vexflow';
// import './SheetMusic.css'; 

// const SheetMusic = ({ sheets, currentSheetId, selectedStaveIndex, onSelectStave }) => {
//   const canvasRef = useRef(null);
//   const [clefs, setClefs] = useState({});
//   const [selectedStave, setSelectedStave] = useState(null); // Trạng thái để theo dõi stave được chọn

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const vf = new Renderer(canvasRef.current, Renderer.Backends.CANVAS);
//     const context = vf.getContext();
//     context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

//     const sheet = sheets.find(sheet => sheet.id === currentSheetId);
//     if (!sheet) return;

//     const staveWidth = 1500;
//     const staveHeight = 100;
//     const spaceBetweenStaves = 80;
//     const numStaves = sheet.staves.length;
//     const totalHeight = numStaves * (staveHeight + spaceBetweenStaves);

//     vf.resize(staveWidth + 100, totalHeight + 100);

//     let yOffset = 10;

//     sheet.staves.forEach((staveData, index) => {
//       const stave = new Stave(10, yOffset, staveWidth);
//       const clef = clefs[index] || (index === 0 ? 'treble' : 'bass');
//       stave.addClef(clef).addTimeSignature("4/4");
//       stave.setContext(context).draw();

//       if (selectedStaveIndex === index) {
//         context.strokeStyle = 'red';
//         context.lineWidth = 2;
//         context.beginPath();
//         context.rect(stave.getX(), stave.getY(), staveWidth, staveHeight);
//         context.stroke();
//         context.closePath();
//       }

//       const staveNotes = staveData.notes.map(({ note, duration }) => {
//         return new StaveNote({
//           keys: [note],
//           duration,
//         });
//       });

//       const numBeats = staveNotes.reduce((acc, note) => {
//         return acc + (noteValueToTicks[note.duration] || 1);
//       }, 0);

//       const beatValue = 4; // Adjust this based on your time signature if needed
//       const voice = new Voice({ num_beats: numBeats, beat_value: beatValue });
//       voice.addTickables(staveNotes);

//       try {
//         new Formatter()
//           .joinVoices([voice])
//           .format([voice], staveWidth - 20);
//         voice.draw(context, stave);
//       } catch (error) {
//         console.error("Error rendering music:", error);
//       }

//       // Draw stave connectors if needed
//       if (index < sheet.staves.length - 1) {
//         const nextStave = new Stave(10, yOffset + staveHeight + spaceBetweenStaves, staveWidth);
//         new StaveConnector(stave, nextStave).setType(StaveConnector.type.BRACE).setContext(context).draw();
//       }

//       yOffset += staveHeight + spaceBetweenStaves;
//     });
//   }, [sheets, currentSheetId, selectedStaveIndex, clefs]);

//   const handleClefChange = (newClef) => {
//     if (selectedStaveIndex !== null) {
//       setClefs(prevClefs => ({
//         ...prevClefs,
//         [selectedStaveIndex]: newClef
//       }));
//     }
//   };

//   return (
//     <div className="sheet-music-container">
//       <canvas
//         ref={canvasRef}
//         width={1500}
//         height={600}
//         onClick={(e) => {
//           const rect = canvasRef.current.getBoundingClientRect();
//           const x = e.clientX - rect.left;
//           const y = e.clientY - rect.top;

//           const staveHeight = 150;
//           const spaceBetweenStaves = 80;

//           const staveIndex = Math.floor((y - 10) / (staveHeight + spaceBetweenStaves));
//           if (staveIndex >= 0 && staveIndex < sheets.find(sheet => sheet.id === currentSheetId).staves.length) {
//             onSelectStave(staveIndex);
//             setSelectedStave(staveIndex); // Cập nhật stave được chọn
//           }
//         }}
//       />
//       {selectedStaveIndex !== null && (
//         <div className="controls">
//           <div className="control-item">
//             <label>Clef:</label>
//             <select
//               value={clefs[selectedStaveIndex] || (selectedStaveIndex === 0 ? 'bass' : 'treble')}
//               onChange={(e) => handleClefChange(e.target.value)}
//             >
//               <option value="treble">Treble</option>
//               <option value="bass">Bass</option>
//             </select>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const noteValueToTicks = {
//   'q': 1, // Quarter note
//   'h': 2, // Half note
//   'w': 4, // Whole note
//   '8': 0.5, // Eighth note
//   '16': 0.25 // Sixteenth note
// };

// export default SheetMusic;
