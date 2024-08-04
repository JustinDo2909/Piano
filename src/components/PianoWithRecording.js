import React, { useState, useCallback } from "react";
import { Piano } from "react-piano";

const DURATION_UNIT = 0.2;
const DEFAULT_NOTE_DURATION = DURATION_UNIT;

const PianoWithRecording = ({
  playNote,
  stopNote,
  recording = {
    mode: "RECORDING",
    currentTime: 0,
    events: [],
    currentEvents: [],
  },
  setRecording,
  ...pianoProps
}) => {
  const [notesRecorded, setNotesRecorded] = useState({});
  const [noteDuration, setNoteDuration] = useState(DEFAULT_NOTE_DURATION);

  const recordNotes = useCallback(
    (midiNumbers, duration) => {
      if (recording.mode !== "RECORDING") {
        return;
      }

      const newEvents = midiNumbers
        .filter((midiNumber) => {
          // Check if the note is already recorded in the current recording events
          return !recording.events.some(
            (event) =>
              event.midiNumber === midiNumber &&
              event.time === recording.currentTime
          );
        })
        .map((midiNumber) => ({
          midiNumber,
          time: recording.currentTime,
          duration,
        }));

      if (newEvents.length > 0) {
        setRecording((prevRecording) => ({
          ...prevRecording,
          events: [...prevRecording.events, ...newEvents],
          currentTime: prevRecording.currentTime + duration,
        }));

        // Update the recorded notes state
        setNotesRecorded((prev) => ({
          ...prev,
          ...newEvents.reduce(
            (acc, { midiNumber }) => ({ ...acc, [midiNumber]: true }),
            {}
          ),
        }));
      }
    },
    [recording, setRecording]
  );

  const onPlayNoteInput = useCallback((midiNumber) => {
    // Initialize the note in notesRecorded state
    setNotesRecorded((prev) => ({
      ...prev,
      [midiNumber]: false,
    }));
  }, []);

  const onStopNoteInput = useCallback(
    (midiNumber, { prevActiveNotes }) => {
      // Record the note if it hasn't been recorded yet
      if (!notesRecorded[midiNumber]) {
        recordNotes(prevActiveNotes, noteDuration);
        setNoteDuration(DEFAULT_NOTE_DURATION);
      }
    },
    [notesRecorded, noteDuration, recordNotes]
  );

  const { mode, currentEvents } = recording;
  const activeNotes =
    mode === "PLAYING"
      ? (currentEvents || []).map((event) => event.midiNumber)
      : null;

  return (
    <div>
      <Piano
        playNote={playNote}
        stopNote={stopNote}
        onPlayNoteInput={onPlayNoteInput}
        onStopNoteInput={onStopNoteInput}
        activeNotes={activeNotes}
        {...pianoProps}
      />
    </div>
  );
};

export default PianoWithRecording;
