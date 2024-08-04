import React, { useEffect, useState } from "react";
import { Layout, Button, Input, Card, Modal, Form, Typography, Space, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addGenre, deleteGenre, setGenres, updateGenre } from '../Redux/reducers/musicReducer';
import TypeData from '../Data/TypeMusic.json';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const TypeMusic = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.music.genres);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingGenre, setEditingGenre] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    console.log('TypeData:', TypeData);
    console.log('Genres array:', genres); 
    dispatch(setGenres(TypeData));
  }, [dispatch]);

  const showModal = (genre) => {
    setEditingGenre(genre);
    form.setFieldsValue({
      nameTypeMusic: genre ? genre.nameTypeMusic : '',
      description: genre ? genre.description : '',
    });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      const genreData = { ...values, createdate: new Date().toISOString().split('T')[0], NumberOfPlayed: '0' };
      if (editingGenre) {
        dispatch(updateGenre({ idTypeMusic: editingGenre.idTypeMusic, ...genreData }));
      } else {
        dispatch(addGenre({ idTypeMusic: Date.now(), ...genreData }));
      }
      setIsModalVisible(false);
      setEditingGenre(null);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingGenre(null);
  };

  const handleDelete = (idTypeMusic) => {
    dispatch(deleteGenre(idTypeMusic));
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Layout>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Title level={2} style={{ marginBottom: 16, color: '#001529' }}>Manage Music Genres</Title>
          <Button 
            type="primary" 
            onClick={() => showModal(null)} 
            style={{ marginBottom: 16, borderRadius: 4 }}
          >
            Add Genre
          </Button>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {genres.map((item) => (
              <Card
                key={item.idTypeMusic}
                title={<Text style={{ color: '#fff', fontSize: '20px' }}>{item.nameTypeMusic}</Text>}
                extra={
                  <Space>
                    <Button 
                      type="link" 
                      icon={<EditOutlined />} 
                      onClick={() => showModal(item)}
                      style={{ color: '#fff' }}
                    />
                    <Button 
                      type="link" 
                      danger 
                      icon={<DeleteOutlined />} 
                      onClick={() => handleDelete(item.idTypeMusic)}
                      style={{ color: 'white' }}
                    />
                  </Space>
                }
                style={{ 
                  flex: '1 0 40%',
                  background: `url(${item.backgroundImage}) no-repeat center center`,
                  backgroundSize: 'cover',
                  height: '100%',
                  position: 'relative',
                  color: '#fff',
                  borderRadius: 8,
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0, 0, 0, 0.4)', // Overlay with 40% opacity
                  zIndex: 1,
                  pointerEvents: 'none', // Allow clicks to pass through
                }} />
                <div style={{ position: 'relative', zIndex: 2, padding: '16px' }}>
                  <Paragraph style={{ color: '#fff' }}>{item.description}</Paragraph>
                  <Divider style={{ borderColor: '#fff' }} />
                  <Paragraph style={{ color: '#fff' }}>
                    <strong>Number of Plays:</strong> {item.NumberOfPlayed}
                  </Paragraph>
                  <Paragraph style={{ color: '#fff' }}>
                    <strong>Created Date:</strong> {new Date(item.createdate).toLocaleDateString()}
                  </Paragraph>
                </div>
              </Card>
            ))}
          </div>
          <Modal
            title={editingGenre ? 'Edit Genre' : 'Add Genre'}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={editingGenre ? 'Update' : 'Add'}
            cancelText="Cancel"
            style={{ borderRadius: 8 }}
          >
            <Form form={form} layout="vertical">
              <Form.Item
                name="nameTypeMusic"
                label="Genre Name"
                rules={[{ required: true, message: 'Please input the genre name!' }]}
              >
                <Input placeholder="Enter genre name" />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
              >
                <Input.TextArea placeholder="Enter genre description" rows={4} />
              </Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default TypeMusic;