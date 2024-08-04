import React, { useState } from 'react';
import { Layout, Button, Upload, InputNumber, Typography, Row, Col, Card, message, Select } from 'antd';
import { UploadOutlined, PlayCircleOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import * as Tone from "tone";
import { parseMidiFile, parsedMidiToCustomFormat } from "./midiConverter";
import backGround from '../../image/3766921.jpg';
const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const sampleSongs = [
  { name: "Song A" },
  { name: "Song B" },
  { name: "Song C" }
];

const Compose = () => {
  const [outputLeft, setOutputLeft] = useState("");
  const [outputRight, setOutputRight] = useState("");
  const [parsedMidi, setParsedMidi] = useState(null);
  const [speed, setSpeed] = useState(1); // Speed factor
  const [selectedSong, setSelectedSong] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleFileUpload = (options) => {
    const { file, onSuccess, onError } = options;
    const reader = new FileReader();

    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      const midi = new Uint8Array(arrayBuffer);
      try {
        const parsed = parseMidiFile(midi);
        setParsedMidi(parsed);

        const { leftHand, rightHand } = parsedMidiToCustomFormat(parsed);
        setOutputLeft(leftHand);
        setOutputRight(rightHand);
        setIsFileUploaded(true);
        onSuccess("ok");
      } catch (error) {
        message.error("Failed to parse MIDI file.");
        onError(error);
      }
    };

    reader.onerror = (e) => {
      message.error("Failed to read file.");
      onError(e);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleDeleteFile = () => {
    setOutputLeft("");
    setOutputRight("");
    setParsedMidi(null);
    setIsFileUploaded(false);
    message.success("MIDI file removed.");
  };

  const handleSaveFile = () => {
    if (outputLeft && outputRight && selectedSong) {
      const songData = {
        leftHand: outputLeft,
        rightHand: outputRight
      };
      localStorage.setItem(selectedSong, JSON.stringify(songData));
      message.success(`Notes saved to ${selectedSong}.`);
    } else {
      message.error("No notes to save or no song selected.");
    }
  };

  const parseNote = (note) => {
    const [pitch, duration] = note.split("_");
    return { pitch, duration: parseFloat(duration) };
  };

  const playNotes = (notes, instrument) => {
    let currentTime = Tone.now(); // Use Tone.now() for the starting time

    notes.split(" / ").forEach((measure) => {
      let measureStartTime = currentTime; // Start each measure at the current time

      measure.split(" ").forEach((noteStr) => {
        if (noteStr.trim() !== "") {
          const { pitch, duration } = parseNote(noteStr);
          if (!isNaN(duration)) {
            // Ensure that each note starts after the previous note ends
            instrument.triggerAttackRelease(
              pitch,
              duration / speed,
              measureStartTime
            );
            // Update measureStartTime for the next note
            measureStartTime += duration / speed;

            // Ensure no overlapping notes
            if (measureStartTime <= currentTime) {
              measureStartTime = currentTime + 0.001; // Small buffer to avoid overlap
            }
          }
        }
      });

      // Update currentTime to be the end of the current measure
      currentTime = measureStartTime;
    });
  };

  const handlePlayMusic = async () => {
    await Tone.start();
    const leftHandSynth = new Tone.Synth().toDestination();
    const rightHandSynth = new Tone.Synth().toDestination();

    playNotes(outputLeft, leftHandSynth);
    playNotes(outputRight, rightHandSynth);
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundImage: `url(${backGround})`, backgroundSize: 'cover', margin: 0 , padding: 0}}>
      <Content style={{ padding: '50px', margin: 0 }}>
        <Card style={{ maxWidth: '800px', margin: 'auto', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <Title level={2} style={{ textAlign: 'center', color: '#1890ff' }}>MIDI Converter</Title>
          <Row gutter={[16, 16]} justify="center">
            <Col span={12}>
              <Select
                placeholder="Select a song"
                style={{ width: '100%' }}
                onChange={setSelectedSong}
              >
                {sampleSongs.map(song => (
                  <Option key={song.name} value={song.name}>
                    <div style={{ color: localStorage.getItem(song.name) ? 'green' : 'gray' }}>
                      {song.name}
                    </div>
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={12}>
              <Upload
                accept=".mid"
                customRequest={handleFileUpload}
                showUploadList={false}
                disabled={!selectedSong}
              >
                <Button
                  icon={<UploadOutlined />}
                  type="primary"
                  block
                  style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
                >
                  Upload MIDI File
                </Button>
              </Upload>
            </Col>
          </Row>
          <Row gutter={[16, 16]} justify="center" style={{ marginTop: '20px' }}>
            <Col span={8}>
              <Button
                icon={<PlayCircleOutlined />}
                type="primary"
                block
                onClick={handlePlayMusic}
                disabled={!isFileUploaded}
                style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
              >
                Play Music
              </Button>
            </Col>
            <Col span={8}>
              <Button
                icon={<DeleteOutlined />}
                type="primary"
                block
                onClick={handleDeleteFile}
                disabled={!isFileUploaded}
                style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' }}
              >
                Delete MIDI File
              </Button>
            </Col>
            <Col span={8}>
              <Button
                icon={<SaveOutlined />}
                type="primary"
                block
                onClick={handleSaveFile}
                disabled={!isFileUploaded || !selectedSong}
                style={{ backgroundColor: '#faad14', borderColor: '#faad14' }}
              >
                Save Notes
              </Button>
            </Col>
          </Row>
          <Row gutter={[16, 16]} justify="center" style={{ marginTop: '20px' }}>
            <Col span={12}>
              <Text>Speed:</Text>
              <InputNumber
                value={speed}
                onChange={value => setSpeed(value)}
                step={0.1}
                min={0.1}
                style={{ width: '100%' }}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
            <Col span={12}>
              <Card title="Left Hand" bordered={false} headStyle={{ color: '#52c41a' }} bodyStyle={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                {outputLeft}
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Right Hand" bordered={false} headStyle={{ color: '#f5222d' }} bodyStyle={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                {outputRight}
              </Card>
            </Col>
          </Row>
        </Card>
      </Content>
    </Layout>
  );
};

export default Compose;