import React, { useState } from "react";

const NoteSelector = ({
  onAddNote,
  onAddBar,
  onAddNewLine,
  onRemoveLastNote,
}) => {
  const [note, setNote] = useState("C");
  const [duration, setDuration] = useState("1");

  const handleAddNote = () => {
    console.log(`${note}${duration}`);
    onAddNote({ note, duration });
    setNote("C");
    setDuration("1");
  };

  const handleAddBar = () => {
    onAddBar();
  };

  const handleAddNewLine = () => {
    onAddNewLine();
  };

  const handleRemoveLastNote = () => {
    onRemoveLastNote();
  };

  return (
    <div>
      <h2>Select Note</h2>
      <label>
        Note:
        <select
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
            console.log(e.target);
          }}
        >
          <option value="C,,,">C1</option>
          <option value="D,,,">D1</option>
          <option value="E,,,">E1</option>
          <option value="F,,,">F1</option>
          <option value="G,,,">G1</option>
          <option value="A,,,">A1</option>
          <option value="B,,,">B1</option>
          <option value="C,,">C2</option>
          <option value="D,,">D2</option>
          <option value="E,,">E2</option>
          <option value="F,,">F2</option>
          <option value="G,,">G2</option>
          <option value="A,,">A2</option>
          <option value="B,,">B2</option>
          <option value="C,">C3</option>
          <option value="D,">D3</option>
          <option value="E,">E3</option>
          <option value="F,">F3</option>
          <option value="G,">G3</option>
          <option value="A,">A3</option>
          <option value="B,">B3</option>
          <option value="C">C4</option>
          <option value="D">D4</option>
          <option value="E">E4</option>
          <option value="F">F4</option>
          <option value="G">G4</option>
          <option value="A">A4</option>
          <option value="B">B4</option>
          <option value="c">C5</option>
          <option value="d">D5</option>
          <option value="e">E5</option>
          <option value="f">F5</option>
          <option value="g">G5</option>
          <option value="a">A5</option>
          <option value="b">B5</option>
          <option value="c'">C6</option>
          <option value="d'">D6</option>
          <option value="e'">E6</option>
          <option value="f'">F6</option>
          <option value="g'">G6</option>
          <option value="a'">A6</option>
          <option value="b'">B6</option>
          <option value="c''">C7</option>
          <option value="d''">D7</option>
          <option value="e''">E7</option>
          <option value="f''">F7</option>
          <option value="g''">G7</option>
          <option value="a''">A7</option>
          <option value="b''">B7</option>
          <option value="c'''">C8</option>
          <option value="d'''">D8</option>
          <option value="e'''">E8</option>
          <option value="f'''">F8</option>
          <option value="g'''">G8</option>
          <option value="a'''">A8</option>
          <option value="b'''">B8</option>
          <option value="^C,,,">C1#</option>
          <option value="^D,,,">D1#</option>
          <option value="^E,,,">E1#</option>
          <option value="^F,,,">F1#</option>
          <option value="^G,,,">G1#</option>
          <option value="^A,,,">A1#</option>
          <option value="^B,,,">B1#</option>
          <option value="^C,,">C2#</option>
          <option value="^D,,">D2#</option>
          <option value="^E,,">E2#</option>
          <option value="^F,,">F2#</option>
          <option value="^G,,">G2#</option>
          <option value="^A,,">A2#</option>
          <option value="^B,,">B2#</option>
          <option value="^C,">C3#</option>
          <option value="^D,">D3#</option>
          <option value="^E,">E3#</option>
          <option value="^F,">F3#</option>
          <option value="^G,">G3#</option>
          <option value="^A,">A3#</option>
          <option value="^B,">B3#</option>
          <option value="^C">C4#</option>
          <option value="^D">D4#</option>
          <option value="^E">E4#</option>
          <option value="^F">F4#</option>
          <option value="^G">G4#</option>
          <option value="^A">A4#</option>
          <option value="^B">B4#</option>
          <option value="^c">C5#</option>
          <option value="^d">D5#</option>
          <option value="^e">E5#</option>
          <option value="^f">F5#</option>
          <option value="^g">G5#</option>
          <option value="^a">A5#</option>
          <option value="^b">B5#</option>
          <option value="^c'">C6#</option>
          <option value="^d'">D6#</option>
          <option value="^e'">E6#</option>
          <option value="^f'">F6#</option>
          <option value="^g'">G6#</option>
          <option value="^a'">A6#</option>
          <option value="^b'">B6#</option>
          <option value="^c''">C7#</option>
          <option value="^d''">D7#</option>
          <option value="^e''">E7#</option>
          <option value="^f''">F7#</option>
          <option value="^g''">G7#</option>
          <option value="^a''">A7#</option>
          <option value="^b''">B7#</option>
          <option value="^c'''">C8#</option>
          <option value="^d'''">D8#</option>
          <option value="^e'''">E8#</option>
          <option value="^f'''">F8#</option>
          <option value="^g'''">G8#</option>
          <option value="^a'''">A8#</option>
          <option value="^b'''">B8#</option>
          <option value="_C,,,">C1b</option>
          <option value="_D,,,">D1b</option>
          <option value="_E,,,">E1b</option>
          <option value="_F,,,">F1b</option>
          <option value="_G,,,">G1b</option>
          <option value="_A,,,">A1b</option>
          <option value="_B,,,">B1b</option>
          <option value="_C,,">C2b</option>
          <option value="_D,,">D2b</option>
          <option value="_E,,">E2b</option>
          <option value="_F,,">F2b</option>
          <option value="_G,,">G2b</option>
          <option value="_A,,">A2b</option>
          <option value="_B,,">B2b</option>
          <option value="_C,">C3b</option>
          <option value="_D,">D3b</option>
          <option value="_E,">E3b</option>
          <option value="_F,">F3b</option>
          <option value="_G,">G3b</option>
          <option value="_A,">A3b</option>
          <option value="_B,">B3b</option>
          <option value="_C">C4b</option>
          <option value="_D">D4b</option>
          <option value="_E">E4b</option>
          <option value="_F">F4b</option>
          <option value="_G">G4b</option>
          <option value="_A">A4b</option>
          <option value="_B">B4b</option>
          <option value="_c">C5b</option>
          <option value="_d">D5b</option>
          <option value="_e">E5b</option>
          <option value="_f">F5b</option>
          <option value="_g">G5b</option>
          <option value="_a">A5b</option>
          <option value="_b">B5b</option>
          <option value="_c'">C6b</option>
          <option value="_d'">D6b</option>
          <option value="_e'">E6b</option>
          <option value="_f'">F6b</option>
          <option value="_g'">G6b</option>
          <option value="_a'">A6b</option>
          <option value="_b'">B6b</option>
          <option value="_c''">C7b</option>
          <option value="_d''">D7b</option>
          <option value="_e''">E7b</option>
          <option value="_f''">F7b</option>
          <option value="_g''">G7b</option>
          <option value="_a''">A7b</option>
          <option value="_b''">B7b</option>
          <option value="_c'''">C8b</option>
          <option value="_d'''">D8b</option>
          <option value="_e'''">E8b</option>
          <option value="_f'''">F8b</option>
          <option value="_g'''">G8b</option>
          <option value="_a'''">A8b</option>
          <option value="_b'''">B8b</option>
          <option value="z">Nốt lặng</option>
        </select>
      </label>
      <label>
        Duration:
        <select value={duration} onChange={(e) => setDuration(e.target.value)}>
          <option value="/2">Nốt móc kép</option>
          <option value="1">Nốt móc đơn</option>
          <option value="2">Nốt đen</option>
          {/* <option value="3">Nốt chấm đen</option> */}
          <option value="4">Nốt trắng</option>
          {/* <option value="5">Nốt chấm trắng</option> */}
          <option value="8">Nốt tròn</option>
          <option value="9">Nốt chấm tròn</option>
        </select>
      </label>
      <button onClick={handleAddNote}>Add Note</button>
      <button onClick={handleAddBar}>Add Bar</button>
      <button onClick={handleAddNewLine}>Add New Line</button>
      <button onClick={handleRemoveLastNote}>Remove Last Note</button>
    </div>
  );
};

export default NoteSelector;
