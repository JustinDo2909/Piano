import { parseMidi } from "midi-file";

export const parseMidiFile = (midiArray) => {
  const parsed = parseMidi(midiArray);
  return parsed;
};

const noteNumberToNoteName = (noteNumber) => {
  const notes = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const octave = Math.floor(noteNumber / 12) - 1;
  const note = notes[noteNumber % 12];
  return `${note}${octave}`;
};

const durationToCustomFormat = (duration, ticksPerBeat) => {
  const durationInBeats = duration / ticksPerBeat;
  return durationInBeats.toString(); // Custom durations
};

const groupNotesByMeasure = (notes, ticksPerBeat, timeSignature) => {
  const measures = [];
  let currentMeasure = [];
  let currentTime = 0;
  const measureLength = timeSignature[0] * ticksPerBeat;

  notes.forEach((note) => {
    while (note.time >= currentTime + measureLength) {
      measures.push(currentMeasure);
      currentMeasure = [];
      currentTime += measureLength;
    }
    currentMeasure.push(note);
  });

  if (currentMeasure.length > 0) {
    measures.push(currentMeasure);
  }

  return measures;
};

export const parsedMidiToCustomFormat = (parsedMidi) => {
  const ticksPerBeat = parsedMidi.header.ticksPerBeat;
  const timeSignature = [4, 4]; // Default time signature, can be adjusted

  let leftHand = "";
  let rightHand = "";
  let music = "";

  parsedMidi.tracks.forEach((track) => {
    let currentTime = 0;
    const notes = [];

    track.forEach((event) => {
      if (event.deltaTime) {
        currentTime += event.deltaTime;
      }
      if (event.type === "noteOn" || event.type === "noteOff") {
        notes.push({ ...event, time: currentTime });
      }
    });

    const measures = groupNotesByMeasure(notes, ticksPerBeat, timeSignature);

    measures.forEach((measure) => {
      let leftMeasure = "";
      let rightMeasure = "";
      measure.forEach((note) => {
        const noteName = noteNumberToNoteName(note.noteNumber);
        const duration = durationToCustomFormat(note.deltaTime, ticksPerBeat);

        if (note.noteNumber < 60) {
          leftMeasure += `${noteName}_${duration} `;
        } else {
          rightMeasure += `${noteName}_${duration} `;
        }
        music += `${noteName}_${duration}`;
      });
      leftHand += leftMeasure.trim() + " / ";
      rightHand += rightMeasure.trim() + " / ";
    });
  });

  return { leftHand: leftHand.trim(), rightHand: rightHand.trim() };
};
