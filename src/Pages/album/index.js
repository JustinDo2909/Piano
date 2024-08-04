import { Button, Layout, Table, Select, Modal, Form, Input } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import iconMusic from "../../image/music_icon.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setMusicList, addMusic } from "../../Redux/reducers/musicReducer";
import musicData from "../../Data/Music.json";
import PianoInput from "../../components/PianoInput";
import backGround from '../../image/3766921.jpg';

const { Option } = Select;
const { Header, Footer } = Layout;

const MyAlbum = () => {
  const dispatch = useDispatch();
  const musicList = useSelector((state) => state.music.musicList);
  const [selectedArtist, setSelectedArtist] = useState("001");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pianoChords, setPianoChords] = useState("");

  useEffect(() => {
    dispatch(setMusicList(musicData));
  }, [dispatch]);

  const handleArtistChange = (value) => {
    setSelectedArtist(value);
  };

  const showAddMusicModal = () => {
    setIsModalVisible(true);
  };

  const handleAddMusic = (values) => {
    const newMusic = {
      idMusic: musicList.length + 1,
      ...values,
      pianoChords,
      artist: {
        idArtist: selectedArtist,
        nameArtist: musicList.find(
          (music) => music.artist.idArtist === selectedArtist
        ).artist.nameArtist,
      },
    };
    dispatch(addMusic(newMusic));
    setIsModalVisible(false);
  };

  const filteredMusic = musicList.filter(
    (music) => music.artist.idArtist === selectedArtist
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "nameMusic",
      key: "nameMusic",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Number of Plays",
      dataIndex: "NumberOfPlayed",
      key: "NumberOfPlayed",
    },
    {
      title: "Piano Chords",
      dataIndex: "pianoChords",
      key: "pianoChords",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", background: `url(${backGround}) no-repeat center center fixed`, backgroundSize: 'cover' }}>
      <Header style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '0 24px' }}>
        <h1 style={{ color: '#fff', textAlign: 'center', lineHeight: '64px' }}>MyAlbum</h1>
      </Header>
      <Content style={{ padding: 24, margin: '24px 16px 0', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px' }}>
        <h2 style={{ textAlign: "center" }}>Welcome to MyAlbum</h2>
        <Select
          defaultValue="001"
          style={{ width: 200, marginBottom: 20 }}
          onChange={handleArtistChange}
        >
          <Option value="001">John Doe</Option>
          <Option value="002">Jane Smith</Option>
          <Option value="003">Michael Johnson</Option>
          <Option value="004">Emily Davis</Option>
        </Select>
        <Button
          type="default"
          style={{
            background: "green",
            borderRadius: "20px",
            color: "white",
            marginLeft: 20,
            width: "10%",
          }}
          onClick={showAddMusicModal}
        >
          Add Music <img width={"20%"} src={iconMusic} alt="Music Icon" />
        </Button>
        <Table
          dataSource={filteredMusic}
          columns={columns}
          rowKey="idMusic"
          style={{ marginTop: 20 }}
          pagination={{ pageSize: 5 }}
        />
        <Modal
          title="Add New Music"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form onFinish={handleAddMusic}>
            <Form.Item
              name="nameMusic"
              label="Music Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="author" label="Author" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="type" label="Type" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="NumberOfPlayed"
              label="Number of Plays"
              rules={[{ required: true }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item>
              <PianoInput onChordsSubmit={setPianoChords} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Music
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
      <Footer style={{ textAlign: 'center', background: 'rgba(0, 0, 0, 0.5)', color: '#fff' }}>
        ©2024 MyAlbum. All Rights Reserved.
      </Footer>
    </Layout>
  );
};

export default MyAlbum;