// src/components/MyAlbum.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Layout, Modal, Select, Table } from 'antd';
import { setMusicList, addMusic } from '../../Redux/reducers/musicReducer';
import musicData from '../../Data/Music.json';
import iconMusic from '../../image/music_icon.jpg';

const { Content } = Layout;

const MyAlbum = () => {
  const dispatch = useDispatch();
  const musicList = useSelector((state) => state.music.musicList);
  const [searchValue, setSearchValue] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [newMusic, setNewMusic] = useState({});

  useEffect(() => {
    dispatch(setMusicList(musicData));
  }, [dispatch]);

  const handleSearch = (event) => setSearchValue(event.target.value);

  const handleAddMusicClick = () => {
    setNewMusic({});
    setOpenModal(true);
  };

  const artistId = '001'
  const handleSaveMusic = () => {
    if (newMusic.nameMusic && newMusic.author && newMusic.type) {
      dispatch(addMusic({ 
        ...newMusic,
        artist: {
          idArtist: artistId,
          nameArtist: 'John Doe' // Replace with actual artist name if available
        },
        idMusic: musicList.length + 1 
      }));
      setOpenModal(false);
    } else {
      alert('Please fill all fields.');
    }
  };

  // Filter music list by artist ID
  const filteredMusic = musicList.filter((music) =>
    music.artist && music.artist.idArtist === artistId
  );

  

  const columns = [
    { title: 'Name', dataIndex: 'nameMusic', key: 'nameMusic' },
    { title: 'Author', dataIndex: 'author', key: 'author' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Number of Plays', dataIndex: 'NumberOfPlayed', key: 'NumberOfPlayed' },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '0 24px 24px', background: '#fff' }}>
        <h2 style={{ textAlign: 'center' }}>Welcome to MyAlbum</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            onClick={handleAddMusicClick}
            type="default"
            style={{ background: 'green', borderRadius: '20px', color: 'white', width: '10%', marginTop: 25 }}
          >
            Add Music <img width={'20%'} src={iconMusic} alt='Music Icon' />
          </Button>
          <div>
            <h3 style={{ textAlign: 'end' }}>Total: {filteredMusic.length}</h3>
            <Input
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearch}
              style={{ width: 300 }}
            />
          </div>
        </div>
        <Table
          dataSource={filteredMusic}
          columns={columns}
          rowKey="idMusic"
          style={{ marginTop: 20 }}
          pagination={{ pageSize: 5 }}
        />
      </Content>
      {openModal && (
        <Modal
          title="ADD MUSIC TO YOUR ALBUM"
          visible={openModal}
          onCancel={() => setOpenModal(false)}
          footer={null}
        >
          <h2>ADD MUSIC TO YOUR ALBUM</h2>
          <Input
            placeholder="Name"
            value={newMusic.nameMusic || ''}
            onChange={(e) => setNewMusic({ ...newMusic, nameMusic: e.target.value })}
          />
          <Input
            placeholder="Author"
            value={newMusic.author || ''}
            onChange={(e) => setNewMusic({ ...newMusic, author: e.target.value })}
          />
          <Select
            placeholder="Type"
            value={newMusic.type || ''}
            onChange={(value) => setNewMusic({ ...newMusic, type: value })}
          >
            <Select.Option value="Pop">Pop</Select.Option>
            <Select.Option value="Rock">Rock</Select.Option>
            <Select.Option value="Hip-Hop">Hip-Hop</Select.Option>
          </Select>
          <Input
            type="file"
            accept=".mp3"
            onChange={(e) => setNewMusic({ ...newMusic, file: e.target.files[0] })}
          />
          <Button type="primary" onClick={handleSaveMusic}>Save Music</Button>
        </Modal>
      )}
    </Layout>
  );
};

export default MyAlbum;
