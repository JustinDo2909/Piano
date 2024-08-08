import React, { useEffect, useState } from "react";
import {
  Layout,
  Button,
  Input,
  Card,
  Modal,
  Form,
  Typography,
  Space,
  Upload,
  message,
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addGenre,
  deleteGenre,
  setGenres,
  updateGenre,
} from "../../Redux/reducers/musicReducer";
import TypeData from "../../Data/TypeMusic.json";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import backGround from "../../image/3766921.jpg";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const TypeMusic = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.music.genres);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingGenre, setEditingGenre] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setGenres(TypeData));
  }, [dispatch]);

  const showModal = (genre) => {
    setEditingGenre(genre);
    setImageUrl(genre ? genre.backgroundImage : "");
    form.setFieldsValue({
      nameTypeMusic: genre ? genre.nameTypeMusic : "",
      description: genre ? genre.description : "",
    });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const genreData = {
        ...values,
        createdate: new Date().toISOString().split("T")[0],
        NumberOfPlayed: "0",
        backgroundImage: imageUrl,
      };
      if (editingGenre) {
        dispatch(
          updateGenre({ idTypeMusic: editingGenre.idTypeMusic, ...genreData })
        );
      } else {
        dispatch(addGenre({ idTypeMusic: Date.now(), ...genreData }));
      }
      setIsModalVisible(false);
      setEditingGenre(null);
      setImageUrl("");
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingGenre(null);
    setImageUrl("");
  };

  const handleDelete = (idTypeMusic) => {
    dispatch(deleteGenre(idTypeMusic));
  };

  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      const reader = new FileReader();
      reader.readAsDataURL(info.file.originFileObj);
      reader.onload = () => {
        setImageUrl(reader.result);
      };
    } else if (info.file.status === "error") {
      setImageUrl("");
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isJpg = file.type === "image/jpeg";
      if (!isJpg) {
        message.error("You can only upload JPG files!");
      }
      return isJpg;
    },
    onChange: handleImageChange,
    showUploadList: false,
  };

  const handleDetail = (item) => {
    navigate(`${item.idTypeMusic}`, {
      state: {
        name: item.nameTypeMusic
      }
    });
  };

  const genresList = [
    { id: 1, name: "Pop" },
    { id: 2, name: "Rock" },
    { id: 3, name: "Jazz" },
    { id: 4, name: "Classical" },
    { id: 5, name: "Hip Hop" },
    { id: 6, name: "Electronic" },
  ];

  return (
    <Layout
      style={{
        minHeight: "92vh",
        background: `url(${backGround}) no-repeat center center fixed`,
        backgroundSize: "cover",
      }}
    >
      <Layout
        style={{
          background: "rgba(255, 255, 255, 0.5)",
          borderRadius: 8,
          padding: 24,
          margin: 24,
          overflowY: "auto", // Allows the container to scroll if necessary
        }}
      >
        <Content
          style={{
            margin: 0,
            borderRadius: 8,
            padding: 16,
          }}
        >
          <Title level={2} style={{ marginBottom: 16, color: "white" }}>
            Manage Music Genres
          </Title>
          <Button
            type="primary"
            onClick={() => showModal(null)}
            style={{ marginBottom: 16, borderRadius: 4 }}
          >
            Add Genre
          </Button>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {genres.map((item) => (
              <Card
                key={item.idTypeMusic}
                onClick={() => handleDetail(item)}
                style={{
                  flex: "1 0 calc(50% - 16px)", // Two items per row
                  background: `url(${item.backgroundImage}) no-repeat center center`,
                  backgroundSize: "cover",
                  height: "300px", // Larger card height
                  position: "relative",
                  color: "#fff",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0, 0, 0, 0.6)",
                    zIndex: 1,
                    pointerEvents: "none",
                  }}
                />

                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <div>
                    <Text style={{ color: "white", fontSize: "24px" }}>
                      {item.nameTypeMusic}
                    </Text>
                    <Paragraph style={{ color: "#fff" }}>
                      {item.description}
                    </Paragraph>
                  </div>
                  <div>
                    <Space style={{ zIndex: 2 }}>
                      <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={(e) => {
                          e.stopPropagation();
                          showModal(item);
                        }}
                        style={{ color: "#fff" }}
                      />
                      <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.idTypeMusic);
                        }}
                        style={{ color: "white" }}
                      />
                    </Space>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <Modal
            title={editingGenre ? "Edit Genre" : "Add Genre"}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={editingGenre ? "Update" : "Add"}
            cancelText="Cancel"
            style={{ borderRadius: 8 }}
          >
            <Form form={form} layout="vertical">
              <Form.Item
                name="nameTypeMusic"
                label="Genre Name"
                rules={[{ required: true, message: "Please select a genre!" }]}
              >
                <Select placeholder="Select a genre">
                  {genresList.map((type) => (
                    <Option key={type.id} value={type.name}>
                      {type.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="description" label="Description">
                <Input.TextArea
                  placeholder="Enter genre description"
                  rows={4}
                />
              </Form.Item>
              <Form.Item label="Background Image">
                <Upload {...uploadProps}>
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Uploaded"
                    style={{ marginTop: 16, maxHeight: 200 }}
                  />
                )}
              </Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default TypeMusic;
