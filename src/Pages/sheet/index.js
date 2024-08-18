import React, { useState } from "react";
import NoteSelector from "../../components/NoteSelector";
import SheetEditor from "../../components/SheetEditor";
import "./abcjs-audio.css";
import "./sheet.css"
const Sheet = () => {
  const [Rightnotes, setRightNotes] = useState([]);
  const [Leftnotes, setLeftNotes] = useState([]);
  const [topSignature, setTopSignature] = useState("4");
  const [bottomSignature, setBottomSignature] = useState("4");
  const [isRighthand, setIsRighthand] = useState(true);

  const handleAddNote = (note) => {
    if (isRighthand) {
      setRightNotes([...Rightnotes, note]);
    } else {
      setLeftNotes([...Leftnotes, note]);
    }
  };

  const handleAddBar = () => {
    if (isRighthand) {
      setRightNotes([...Rightnotes, "|"]);
    } else {
      setLeftNotes([...Leftnotes, "|"]);
    }
  };

  const handleNewLine = () => {
    if (isRighthand) {
      setRightNotes([...Rightnotes, "\n"]);
    } else {
      setLeftNotes([...Leftnotes, "\n"]);
    }
  };

  const handleRemoveLastNote = () => {
    if (isRighthand) {
      setRightNotes(Rightnotes.slice(0, -1));
    } else {
      setLeftNotes(Leftnotes.slice(0, -1));
    }
  };

  return (
    <div className="App">
      <h1>Music Sheet Creator</h1>
      <div>
        <label>
          Top Signature:
          <input
            type="number"
            value={topSignature}
            onChange={(e) => setTopSignature(e.target.value)}
          />
        </label>
        <label>
          Bottom Signature:
          <input
            type="number"
            value={bottomSignature}
            onChange={(e) => setBottomSignature(e.target.value)}
          />
        </label>
      </div>
      <button onClick={() => setIsRighthand(!isRighthand)}>
        {isRighthand ? "Right Hand" : "Left Hand"}
      </button>
      <NoteSelector
        onAddNote={handleAddNote}
        onAddBar={handleAddBar}
        onAddNewLine={handleNewLine}
        onRemoveLastNote={handleRemoveLastNote}
      />
      <SheetEditor
        Rightnotes={Rightnotes}
        Leftnotes={Leftnotes}
        topSignature={topSignature}
        bottomSignature={bottomSignature}
      />
      <div id="audio"></div>
    </div>
  );
};

export default Sheet;
