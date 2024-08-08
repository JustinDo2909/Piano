// src/PianoComponent.js
import React, { useEffect, useState } from "react";
import { Piano, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import * as Tone from "tone";

// Define the note range for the piano keys
const firstNote = MidiNumbers.fromNote("C4");
const lastNote = MidiNumbers.fromNote("B5");

const PianoComponent = ({ notes }) => {
  const [activeNotes, setActiveNotes] = useState([]);
  const [synth] = useState(new Tone.Synth().toDestination());

  useEffect(() => {
    // Sort notes by start time to ensure they are played in order
    const sortedNotes = [...notes].sort((a, b) => a.startTime - b.startTime);

    const noteToMidi = (note) => {
      try {
        return MidiNumbers.fromNote(note);
      } catch (error) {
        console.error(`Invalid note: ${note}`);
        return null;
      }
    };

    sortedNotes.forEach((note) => {
      const { pitch, duration, startTime } = note;
      const midiNote = noteToMidi(pitch);
      if (midiNote !== null) {
        const endTime = startTime + duration;

        // Ensure previous notes are finished before starting new ones
        if (startTime > Tone.now()) {
          setTimeout(() => {
            synth.triggerAttackRelease(midiNote, duration, startTime);
            setActiveNotes((prev) => [...prev, midiNote]);

            setTimeout(() => {
              setActiveNotes((prev) => prev.filter((n) => n !== midiNote));
            }, duration * 1000);
          }, (startTime - Tone.now()) * 1000);
        } else {
          console.warn(
            `Start time (${startTime}) is not greater than Tone.now()`
          );
        }
      }
    });
  }, [notes, synth]);

  return (
    <div>
      <Piano
        activeNotes={activeNotes}
        noteRange={{ first: firstNote, last: lastNote }}
        playNote={(note) => synth.triggerAttack(note)}
        stopNote={(note) => synth.triggerRelease(note)}
        width={1000}
      />
    </div>
  );
};

export default PianoComponent;
