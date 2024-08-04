// import React, { useState } from 'react';

// const NoteInput = ({ onAddNote }) => {
//   const [note, setNote] = useState('c/4');
//   const [duration, setDuration] = useState('q');

//   const handleAddNote = () => {
//     onAddNote({ note, duration });
//     setNote('c/4');
//     setDuration('q');
//   };

//   return (
//     <div>
//       <select value={note} onChange={(e) => setNote(e.target.value)}>
//         <option value="c/1">C1</option>
//         <option value="d/1">D1</option>
//         <option value="e/1">E1</option>
//         <option value="f/1">F1</option>
//         <option value="g/1">G1</option>
//         <option value="a/1">A1</option>
//         <option value="b/1">B1</option>
//         <option value="c/2">C2</option>
//         <option value="d/2">D2</option>
//         <option value="e/2">E2</option>
//         <option value="f/2">F2</option>
//         <option value="g/2">G2</option>
//         <option value="a/2">A2</option>
//         <option value="b/2">B2</option>
//         <option value="c/3">C3</option>
//         <option value="d/3">D3</option>
//         <option value="e/3">E3</option>
//         <option value="f/3">F3</option>
//         <option value="g/3">G3</option>
//         <option value="a/3">A3</option>
//         <option value="b/3">B3</option>
//         <option value="c/4">C4</option>
//         <option value="d/4">D4</option>
//         <option value="e/4">E4</option>
//         <option value="f/4">F4</option>
//         <option value="g/4">G4</option>
//         <option value="a/4">A4</option>
//         <option value="b/4">B4</option>
//         <option value="c/5">C5</option>
//         <option value="d/5">D5</option>
//         <option value="e/5">E5</option>
//         <option value="f/5">F5</option>
//         <option value="g/5">G5</option>
//         <option value="a/5">A5</option>
//         <option value="b/5">B5</option>
//         <option value="c/6">C6</option>
//         <option value="d/6">D6</option>
//         <option value="e/6">E6</option>
//         <option value="f/6">F6</option>
//         <option value="g/6">G6</option>
//         <option value="a/6">A6</option>
//         <option value="b/6">B6</option>
//         <option value="c/7">C7</option>
//         <option value="d/7">D7</option>
//         <option value="e/7">E7</option>
//         <option value="f/7">F7</option>
//         <option value="g/7">G7</option>
//         <option value="a/7">A7</option>
//         <option value="b/7">B7</option>
//         <option value="c/8">C8</option>
//         <option value="d/8">D8</option>
//         <option value="e/8">E8</option>
//         <option value="f/8">F8</option>
//         <option value="g/8">G8</option>
//         <option value="a/8">A8</option>
//         <option value="b/8">B8</option>
//         <option value="c/1b">C1b</option>
//         <option value="d/1b">D1b</option>
//         <option value="e/1b">E1b</option>
//         <option value="f/1b">F1b</option>
//         <option value="g/1b">G1b</option>
//         <option value="a/1b">A1b</option>
//         <option value="b/1b">B1b</option>
//         <option value="c/2b">C2b</option>
//         <option value="d/2b">D2b</option>
//         <option value="e/2b">E2b</option>
//         <option value="f/2b">F2b</option>
//         <option value="g/2b">G2b</option>
//         <option value="a/2b">A2b</option>
//         <option value="b/2b">B2b</option>
//         <option value="c/3b">C3b</option>
//         <option value="d/3b">D3b</option>
//         <option value="e/3b">E3b</option>
//         <option value="f/3b">F3b</option>
//         <option value="g/3b">G3b</option>
//         <option value="a/3b">A3b</option>
//         <option value="b/3b">B3b</option>
//         <option value="c/4b">C4b</option>
//         <option value="d/4b">D4b</option>
//         <option value="e/4b">E4b</option>
//         <option value="f/4b">F4b</option>
//         <option value="g/4b">G4b</option>
//         <option value="a/4b">A4b</option>
//         <option value="b/4b">B4b</option>
//         <option value="c/5b">C5b</option>
//         <option value="d/5b">D5b</option>
//         <option value="e/5b">E5b</option>
//         <option value="f/5b">F5b</option>
//         <option value="g/5b">G5b</option>
//         <option value="a/5b">A5b</option>
//         <option value="b/5b">B5b</option>
//         <option value="c/6b">C6b</option>
//         <option value="d/6b">D6b</option>
//         <option value="e/6b">E6b</option>
//         <option value="f/6b">F6b</option>
//         <option value="g/6b">G6b</option>
//         <option value="a/6b">A6b</option>
//         <option value="b/6b">B6b</option>
//         <option value="c/7b">C7b</option>
//         <option value="d/7b">D7b</option>
//         <option value="e/7b">E7b</option>
//         <option value="f/7b">F7b</option>
//         <option value="g/7b">G7b</option>
//         <option value="a/7b">A7b</option>
//         <option value="b/7b">B7b</option>
//         <option value="c/8b">C8b</option>
//         <option value="d/8b">D8b</option>
//         <option value="e/8b">E8b</option>
//         <option value="f/8b">F8b</option>
//         <option value="g/8b">G8b</option>
//         <option value="a/8b">A8b</option>
//         <option value="b/8b">B8b</option>
//         <option value="c/1#">C1#</option>
//         <option value="d/1#">D1#</option>
//         <option value="e/1#">E1#</option>
//         <option value="f/1#">F1#</option>
//         <option value="g/1#">G1#</option>
//         <option value="a/1#">A1#</option>
//         <option value="b/1#">B1#</option>
//         <option value="c/2#">C2#</option>
//         <option value="d/2#">D2#</option>
//         <option value="e/2#">E2#</option>
//         <option value="f/2#">F2#</option>
//         <option value="g/2#">G2#</option>
//         <option value="a/2#">A2#</option>
//         <option value="b/2#">B2#</option>
//         <option value="c/3#">C3#</option>
//         <option value="d/3#">D3#</option>
//         <option value="e/3#">E3#</option>
//         <option value="f/3#">F3#</option>
//         <option value="g/3#">G3#</option>
//         <option value="a/3#">A3#</option>
//         <option value="b/3#">B3#</option>
//         <option value="c/4#">C4#</option>
//         <option value="d/4#">D4#</option>
//         <option value="e/4#">E4#</option>
//         <option value="f/4#">F4#</option>
//         <option value="g/4#">G4#</option>
//         <option value="a/4#">A4#</option>
//         <option value="b/4#">B4#</option>
//         <option value="c/5#">C5#</option>
//         <option value="d/5#">D5#</option>
//         <option value="e/5#">E5#</option>
//         <option value="f/5#">F5#</option>
//         <option value="g/5#">G5#</option>
//         <option value="a/5#">A5#</option>
//         <option value="b/5#">B5#</option>
//         <option value="c/6#">C6#</option>
//         <option value="d/6#">D6#</option>
//         <option value="e/6#">E6#</option>
//         <option value="f/6#">F6#</option>
//         <option value="g/6#">G6#</option>
//         <option value="a/6#">A6#</option>
//         <option value="b/6#">B6#</option>
//         <option value="c/7#">C7#</option>
//         <option value="d/7#">D7#</option>
//         <option value="e/7#">E7#</option>
//         <option value="f/7#">F7#</option>
//         <option value="g/7#">G7#</option>
//         <option value="a/7#">A7#</option>
//         <option value="b/7#">B7#</option>
//         <option value="c/8#">C8#</option>
//         <option value="d/8#">D8#</option>
//         <option value="e/8#">E8#</option>
//         <option value="f/8#">F8#</option>
//         <option value="g/8#">G8#</option>
//         <option value="a/8#">A8#</option>
//         <option value="b/8#">B8#</option>
//         <option value="p">Pause</option>
//       </select>
//       <select value={duration} onChange={(e) => setDuration(e.target.value)}>
//         <option value="q">Quarter</option>
//         <option value="h">Half</option>
//         <option value="w">Whole</option>
//         <option value="8">Eighth</option>
//         <option value="16">Sixteenth</option>
//       </select>
//       <button onClick={handleAddNote}>Add Note</button>
//     </div>
//   );
// };

// export default NoteInput;
