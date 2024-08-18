import React, { useRef, useEffect, useState } from "react";
import abcjs from "abcjs";

const parseNoteFormat = (note, duration) => {
  const noteMapping = {
    "C,,,": "C1",
    "C,,,": "D1",
    "C,,,": "E1",
    "C,,,": "F1",
    "C,,,": "G1",
    "C,,,": "A1",
    "C,,,": "B1",
    "C,,": "C2",
    "C,,": "D2",
    "C,,": "E2",
    "C,,": "F2",
    "C,,": "G2",
    "C,,": "A2",
    "C,,": "B2",
    "C,": "C3",
    "C,": "D3",
    "C,": "E3",
    "C,": "F3",
    "C,": "G3",
    "C,": "A3",
    "C,": "B3",
    C: "C4",
    D: "D4",
    E: "E4",
    F: "F4",
    G: "G4",
    A: "A4",
    B: "B4",
    c: "C5",
    d: "D5",
    e: "E5",
    f: "F5",
    g: "G5",
    a: "A5",
    b: "B5",
    "c'": "C6",
    "d'": "D6",
    "e'": "E6",
    "f'": "F6",
    "g'": "G6",
    "a'": "A6",
    "b'": "B6",
    "c''": "C7",
    "d''": "D7",
    "e''": "E7",
    "f''": "F7",
    "g''": "G7",
    "a''": "A7",
    "b''": "B7",
    "c'''": "C8",
    "d'''": "D8",
    "e'''": "E8",
    "f'''": "F8",
    "g'''": "G8",
    "a'''": "A8",
    "b'''": "B8",
    "_C,,,": "C1b",
    "_C,,,": "D1b",
    "_C,,,": "E1b",
    "_C,,,": "F1b",
    "_C,,,": "G1b",
    "_C,,,": "A1b",
    "_C,,,": "B1b",
    "_C,,": "C2b",
    "_C,,": "D2b",
    "_C,,": "E2b",
    "_C,,": "F2b",
    "_C,,": "G2b",
    "_C,,": "A2b",
    "_C,,": "B2b",
    "_C,": "C3b",
    "_C,": "D3b",
    "_C,": "E3b",
    "_C,": "F3b",
    "_C,": "G3b",
    "_C,": "A3b",
    "_C,": "B3b",
    _C: "C4b",
    _D: "D4b",
    _E: "E4b",
    _F: "F4b",
    _G: "G4b",
    _A: "A4b",
    _B: "B4b",
    _c: "C5b",
    _d: "D5b",
    _e: "E5b",
    _f: "F5b",
    _g: "G5b",
    _a: "A5b",
    _b: "B5b",
    "_c'": "C6b",
    "_d'": "D6b",
    "_e'": "E6b",
    "_f'": "F6b",
    "_g'": "G6b",
    "_a'": "A6b",
    "_b'": "B6b",
    "_c''": "C7b",
    "_d''": "D7b",
    "_e''": "E7b",
    "_f''": "F7b",
    "_g''": "G7b",
    "_a''": "A7b",
    "_b''": "B7b",
    "_c'''": "C8b",
    "_d'''": "D8b",
    "_e'''": "E8b",
    "_f'''": "F8b",
    "_g'''": "G8b",
    "_a'''": "A8b",
    "_b'''": "B8b",
    "^C,,,": "C1#",
    "^C,,,": "D1#",
    "^C,,,": "E1#",
    "^C,,,": "F1#",
    "^C,,,": "G1#",
    "^C,,,": "A1#",
    "^C,,,": "B1#",
    "^C,,": "C2#",
    "^C,,": "D2#",
    "^C,,": "E2#",
    "^C,,": "F2#",
    "^C,,": "G2#",
    "^C,,": "A2#",
    "^C,,": "B2#",
    "^C,": "C3#",
    "^C,": "D3#",
    "^C,": "E3#",
    "^C,": "F3#",
    "^C,": "G3#",
    "^C,": "A3#",
    "^C,": "B3#",
    "^C": "C4#",
    "^D": "D4#",
    "^E": "E4#",
    "^F": "F4#",
    "^G": "G4#",
    "^A": "A4#",
    "^B": "B4#",
    "^c": "C5#",
    "^d": "D5#",
    "^e": "E5#",
    "^f": "F5#",
    "^g": "G5#",
    "^a": "A5#",
    "^b": "B5#",
    "^c'": "C6#",
    "^d'": "D6#",
    "^e'": "E6#",
    "^f'": "F6#",
    "^g'": "G6#",
    "^a'": "A6#",
    "^b'": "B6#",
    "^c''": "C7#",
    "^d''": "D7#",
    "^e''": "E7#",
    "^f''": "F7#",
    "^g''": "G7#",
    "^a''": "A7#",
    "^b''": "B7#",
    "^c'''": "C8#",
    "^d'''": "D8#",
    "^e'''": "E8#",
    "^f'''": "F8#",
    "^g'''": "G8#",
    "^a'''": "A8#",
    "^b'''": "B8#",
    z: "P",
  };

  const parsedNote = noteMapping[note] || note;

  // Format the duration according to your requirements:
  const durationMapping = {
    8: 4,
    4: 2,
    2: 1,
    1: 0.5,
    "/2": 0.25,
    9: 6,
  };
  let parsedDuration;
  switch (duration) {
    case "1":
      parsedDuration = "1"; // nốt đen
      break;
    case "2":
      parsedDuration = "2"; // nốt trắng
      break;
    case "4":
      parsedDuration = "4"; // nốt tròn
      break;
    case "0.5":
      parsedDuration = "0.5"; // móc đơn
      break;
    default:
      parsedDuration = duration;
      break;
  }

  return `${parsedNote}_${parsedDuration}`;
};

const SheetEditor = ({
  Rightnotes,
  Leftnotes,
  topSignature,
  bottomSignature,
}) => {
  const abcRef = useRef(null);
  const audioRef = useRef(null);
  const visualObjRef = useRef(null);
  const synthControlRef = useRef(null);
  const [Notation, setNotation] = useState("");
  const [Rightsymbol, setRightSymbol] = useState("");
  const [Leftsymbol, setLeftSymbol] = useState("");

  useEffect(() => {
    const abcNotation =
      `X:1\nT:Chubin\nM:${topSignature}/${bottomSignature}\nL:1/8\nC:Jutin Đỗ\nQ:1/2=100\nK:Emin\nV:1\n` +
      Rightnotes.map((note) =>
        note === "|"
          ? "|"
          : note === "\n"
          ? "\n"
          : `${note.note}${note.duration}`
      ).join("") +
      `\nV:2\n` +
      Leftnotes.map((note) =>
        note === "|"
          ? "|"
          : note === "\n"
          ? "\n"
          : `${note.note}${note.duration}`
      ).join("");

    const parseRightSymbol = Rightnotes.map((note, index) => {
      const parsedNote =
        note === "|"
          ? "/"
          : note === "\n"
          ? ""
          : parseNoteFormat(note.note, note.duration);
      // Check if previous or next note is a bar ("/")
      if (
        note === "|" ||
        (Rightnotes[index - 1] && Rightnotes[index + 1] === "|")
      ) {
        return parsedNote;
      } else {
        return parsedNote + " ";
      }
    }).join("");

    const parseLeftSymbol = Leftnotes.map((note, index) => {
      const parsedNote =
        note === "|"
          ? "/"
          : note === "\n"
          ? ""
          : parseNoteFormat(note.note, note.duration);
      // Check if previous or next note is a bar ("/")
      if (
        note === "|" ||
        (Leftnotes[index - 1] && Leftnotes[index + 1] === "|")
      ) {
        return parsedNote;
      } else {
        return parsedNote + " ";
      }
    }).join("");

    setRightSymbol(parseRightSymbol);
    setLeftSymbol(parseLeftSymbol);
    setNotation(abcNotation);

    // Render ABC notation
    visualObjRef.current = abcjs.renderAbc(abcRef.current, abcNotation)[0];

    // Initialize synth controller
    synthControlRef.current = new abcjs.synth.SynthController();
    synthControlRef.current.load("#audio", null, {
      displayRestart: true,
      displayPlay: true,
      displayProgress: true,
    });

    // Set the tune for playback
    synthControlRef.current.setTune(visualObjRef.current, false);
  }, [Rightnotes, Leftnotes]);

  return (
    <div>
      <div ref={abcRef}></div>
      <div id="audio" ref={audioRef}></div>
      <div>
        <h3>ABC Notation:</h3>
        <pre>{Notation}</pre>
        <h3>Right Symbol:</h3>
        <pre>{Rightsymbol}</pre>
        <h3>Left Symbol:</h3>
        <pre>{Leftsymbol}</pre>
      </div>
    </div>
  );
};

export default SheetEditor;
