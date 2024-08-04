import React, { useState, useCallback, useEffect } from "react";
import _ from "lodash";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";

import SoundfontProvider from "./SoundfontProvider";
import PianoWithRecording from "./PianoWithRecording";

// webkitAudioContext fallback needed to support Safari
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";

const noteRange = {
  first: MidiNumbers.fromNote("c3"),
  last: MidiNumbers.fromNote("f4"),
};
const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: noteRange.first,
  lastNote: noteRange.last,
  keyboardConfig: KeyboardShortcuts.HOME_ROW,
});

const PianoInput = () => {
  const [recording, setRecording] = useState({
    mode: "RECORDING",
    events: [],
    currentTime: 0,
    currentEvents: [],
  });

  const [scheduledEvents, setScheduledEvents] = useState([]);

  const getRecordingEndTime = useCallback(() => {
    if (recording.events.length === 0) {
      return 0;
    }
    return Math.max(
      ...recording.events.map((event) => event.time + event.duration)
    );
  }, [recording.events]);

  const onClickPlay = useCallback(() => {
    setRecording((prevRecording) => ({
      ...prevRecording,
      mode: "PLAYING",
    }));

    const startAndEndTimes = _.uniq(
      _.flatMap(recording.events, (event) => [
        event.time,
        event.time + event.duration,
      ])
    );

    const events = startAndEndTimes.map((time) =>
      setTimeout(() => {
        const currentEvents = recording.events.filter((event) => {
          return event.time <= time && event.time + event.duration > time;
        });
        setRecording((prevRecording) => ({
          ...prevRecording,
          currentEvents,
        }));
      }, time * 1000)
    );

    setScheduledEvents(events);

    // Stop at the end
    setTimeout(() => {
      onClickStop();
    }, getRecordingEndTime() * 1000);
  }, [recording.events, getRecordingEndTime]);

  const onClickStop = useCallback(() => {
    scheduledEvents.forEach((event) => {
      clearTimeout(event);
    });
    setScheduledEvents([]);
    setRecording((prevRecording) => ({
      ...prevRecording,
      mode: "RECORDING",
      currentEvents: [],
    }));
  }, [scheduledEvents]);

  const onClickClear = useCallback(() => {
    onClickStop();
    setRecording({
      events: [],
      mode: "RECORDING",
      currentEvents: [],
      currentTime: 0,
    });
  }, [onClickStop]);

  return (
    <div>
      <div className="mt-5">
        <SoundfontProvider
          instrumentName="acoustic_grand_piano"
          audioContext={audioContext}
          hostname={soundfontHostname}
          render={({ isLoading, playNote, stopNote }) => (
            <PianoWithRecording
              recording={recording}
              setRecording={setRecording}
              noteRange={noteRange}
              width={300}
              playNote={playNote}
              stopNote={stopNote}
              disabled={isLoading}
              keyboardShortcuts={keyboardShortcuts}
            />
          )}
        />
      </div>
      <div className="mt-5">
        <button onClick={onClickPlay}>Play</button>
        <button onClick={onClickStop}>Stop</button>
        <button onClick={onClickClear}>Clear</button>
      </div>
      <div className="mt-5">
        <strong>Recorded notes</strong>
        <div>{JSON.stringify(recording.events)}</div>
      </div>
    </div>
  );
};

export default PianoInput;
