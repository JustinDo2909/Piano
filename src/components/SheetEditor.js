import React, { useEffect, useState } from "react";

const parseNoteFormat = (note1, note2, note3, duration) => {
  const noteMapping = {
    "C,,,": "C1",
    "D,,,": "D1",
    "E,,,": "E1",
    "F,,,": "F1",
    "G,,,": "G1",
    "A,,,": "A1",
    "B,,,": "B1",
    "C,,": "C2",
    "D,,": "D2",
    "E,,": "E2",
    "F,,": "F2",
    "G,,": "G2",
    "A,,": "A2",
    "B,,": "B2",
    "C,": "C3",
    "D,": "D3",
    "E,": "E3",
    "F,": "F3",
    "G,": "G3",
    "A,": "A3",
    "B,": "B3",
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
    "_D,,,": "D1b",
    "_E,,,": "E1b",
    "_F,,,": "F1b",
    "_G,,,": "G1b",
    "_A,,,": "A1b",
    "_B,,,": "B1b",
    "_C,,": "C2b",
    "_D,,": "D2b",
    "_E,,": "E2b",
    "_F,,": "F2b",
    "_G,,": "G2b",
    "_A,,": "A2b",
    "_B,,": "B2b",
    "_C,": "C3b",
    "_D,": "D3b",
    "_E,": "E3b",
    "_F,": "F3b",
    "_G,": "G3b",
    "_A,": "A3b",
    "_B,": "B3b",
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
    "^D,,,": "D1#",
    "^E,,,": "E1#",
    "^F,,,": "F1#",
    "^G,,,": "G1#",
    "^A,,,": "A1#",
    "^B,,,": "B1#",
    "^C,,": "C2#",
    "^D,,": "D2#",
    "^E,,": "E2#",
    "^F,,": "F2#",
    "^G,,": "G2#",
    "^A,,": "A2#",
    "^B,,": "B2#",
    "^C,": "C3#",
    "^D,": "D3#",
    "^E,": "E3#",
    "^F,": "F3#",
    "^G,": "G3#",
    "^A,": "A3#",
    "^B,": "B3#",
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
    "=C,,,": "C1=",
    "=D,,,": "D1=",
    "=E,,,": "E1=",
    "=F,,,": "F1=",
    "=G,,,": "G1=",
    "=A,,,": "A1=",
    "=B,,,": "B1=",
    "=C,,": "C2=",
    "=D,,": "D2=",
    "=E,,": "E2=",
    "=F,,": "F2=",
    "=G,,": "G2=",
    "=A,,": "A2=",
    "=B,,": "B2=",
    "=C,": "C3=",
    "=D,": "D3=",
    "=E,": "E3=",
    "=F,": "F3=",
    "=G,": "G3=",
    "=A,": "A3=",
    "=B,": "B3=",
    "=C": "C4=",
    "=D": "D4=",
    "=E": "E4=",
    "=F": "F4=",
    "=G": "G4=",
    "=A": "A4=",
    "=B": "B4=",
    "=c": "C5=",
    "=d": "D5=",
    "=e": "E5=",
    "=f": "F5=",
    "=g": "G5=",
    "=a": "A5=",
    "=b": "B5=",
    "=c'": "C6=",
    "=d'": "D6=",
    "=e'": "E6=",
    "=f'": "F6=",
    "=g'": "G6=",
    "=a'": "A6=",
    "=b'": "B6=",
    "=c''": "C7=",
    "=d''": "D7=",
    "=e''": "E7=",
    "=f''": "F7=",
    "=g''": "G7=",
    "=a''": "A7=",
    "=b''": "B7=",
    "=c'''": "C8=",
    "=d'''": "D8=",
    "=e'''": "E8=",
    "=f'''": "F8=",
    "=g'''": "G8=",
    "=a'''": "A8=",
    "=b'''": "B8=",
    z: "P",
  };

  const parsedNote1 = noteMapping[note1] || note1;
  const parsedNote2 = noteMapping[note2] || note2;
  const parsedNote3 = noteMapping[note3] || note3;

  // Format the duration according to your requirements:
  const durationMapping = {
    8: 8,
    4: 4,
    2: 2,
    "3/2": 1.5,
    1: 1,
    0.5: 0.5,
    "/4": 0.25,
  };

  const parsedDuration = durationMapping[duration] || duration;

  return `${parsedNote1}${parsedNote2}${parsedNote3}_${parsedDuration}`;
};

const SheetEditor = ({ Rightnotes, Leftnotes }) => {
  const [Rightsymbol, setRightSymbol] = useState("");
  const [Leftsymbol, setLeftSymbol] = useState("");

  function parseNotes(groupsOfNotes) {
    return groupsOfNotes
      .map((groupOrNote) => {
        // Check if the item is a bar symbol
        if (
          typeof groupOrNote === "string" &&
          ["|", "|$", "|:", ":|"].includes(groupOrNote)
        ) {
          return "/";
        }

        // Check if the item is an array (a group of notes)
        if (Array.isArray(groupOrNote)) {
          return groupOrNote
            .map((note, index) => {
              const parsedNote = parseNoteFormat(
                note.note1,
                note.note2,
                note.note3,
                note.duration
              );
              return parsedNote;
            })
            .join(" "); // Join notes in the group without extra space between them
        }

        // Handle individual note objects that are not inside an array
        if (typeof groupOrNote === "object" && groupOrNote !== null) {
          return parseNoteFormat(
            groupOrNote.note1,
            groupOrNote.note2,
            groupOrNote.note3,
            groupOrNote.duration
          ).trim();
        }

        return null; // Fallback for unexpected types
      })
      .join(" "); // Join all groups and symbols together
  }

  useEffect(() => {
    // Debugging statements to track notes and their formats
    console.log("Right Notes:", Rightnotes);
    console.log("Left Notes:", Leftnotes);
  
    const parsedRightSymbol = parseNotes(Rightnotes);
    const parsedLeftSymbol = parseNotes(Leftnotes);
  
    const formattedRightSymbol = parsedRightSymbol
      .replace(/ \/\s*/g, "/")
      .replace(/\s+/g, " ")
      .trim();
  
    const formattedLeftSymbol = parsedLeftSymbol
      .replace(/ \/\s*/g, "/")
      .replace(/\s+/g, " ")
      .trim();
  
    setRightSymbol(formattedRightSymbol);
    setLeftSymbol(formattedLeftSymbol);
  
    localStorage.setItem('RightSymbol', formattedRightSymbol);
    localStorage.setItem('LeftSymbol', formattedLeftSymbol);
  }, [Rightnotes, Leftnotes]);
  
  return (
    <div>
      <h3>Right Symbol:</h3>
      <pre>{Rightsymbol}</pre>
      <h3>Left Symbol:</h3>
      <pre>{Leftsymbol}</pre>
    </div>
  );
};

export default SheetEditor;
