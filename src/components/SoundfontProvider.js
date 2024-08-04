import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Soundfont from "soundfont-player";

const SoundfontProvider = ({
  instrumentName,
  hostname,
  format = "mp3",
  soundfont = "MusyngKite",
  audioContext,
  render,
}) => {
  const [instrument, setInstrument] = useState(null);
  const [activeAudioNodes, setActiveAudioNodes] = useState({});

  const loadInstrument = useCallback(
    (name) => {
      setInstrument(null);
      Soundfont.instrument(audioContext, name, {
        format,
        soundfont,
        nameToUrl: (name, soundfont, format) => {
          return `${hostname}/${soundfont}/${name}-${format}.js`;
        },
      }).then((inst) => {
        setInstrument(inst);
      });
    },
    [audioContext, format, soundfont, hostname]
  );

  useEffect(() => {
    loadInstrument(instrumentName);
  }, [instrumentName, loadInstrument]);

  const playNote = useCallback(
    (midiNumber) => {
      audioContext.resume().then(() => {
        if (instrument) {
          const audioNode = instrument.play(midiNumber);
          setActiveAudioNodes((prevNodes) => ({
            ...prevNodes,
            [midiNumber]: audioNode,
          }));
        }
      });
    },
    [audioContext, instrument]
  );

  const stopNote = useCallback(
    (midiNumber) => {
      audioContext.resume().then(() => {
        const audioNode = activeAudioNodes[midiNumber];
        if (audioNode) {
          audioNode.stop();
          setActiveAudioNodes((prevNodes) => ({
            ...prevNodes,
            [midiNumber]: null,
          }));
        }
      });
    },
    [audioContext, activeAudioNodes]
  );

  const stopAllNotes = useCallback(() => {
    audioContext.resume().then(() => {
      Object.values(activeAudioNodes).forEach((node) => {
        if (node) {
          node.stop();
        }
      });
      setActiveAudioNodes({});
    });
  }, [audioContext, activeAudioNodes]);

  return render({
    isLoading: !instrument,
    playNote,
    stopNote,
    stopAllNotes,
  });
};

SoundfontProvider.propTypes = {
  instrumentName: PropTypes.string.isRequired,
  hostname: PropTypes.string.isRequired,
  format: PropTypes.oneOf(["mp3", "ogg"]),
  soundfont: PropTypes.oneOf(["MusyngKite", "FluidR3_GM"]),
  audioContext: PropTypes.instanceOf(window.AudioContext).isRequired,
  render: PropTypes.func.isRequired,
};

export default SoundfontProvider;
