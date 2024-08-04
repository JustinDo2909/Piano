import React, { useEffect, useState } from 'react';
import { Avatar, Typography, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import users from '../../Data/User.json';
import backGround from '../../image/3766921.jpg';

const { Meta } = Card;
const { Title, Text } = Typography;

const BackgroundContainer = styled.div`
  background-image: url(${backGround});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileCard = styled(Card)`
  width: 500px;
  margin: 20px;
  border-radius: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #f9f9f9;
  .ant-card-cover img {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    object-fit: cover;
    height: 180px;
    filter: grayscale(50%);
  }
`;

const ProfileTitle = styled(Title)`
  font-family: 'Roboto', sans-serif;
  text-align: center;
  color: #333;
  font-size: 22px;
  margin: 10px 0;
  font-weight: 600;
`;

const ProfileDescription = styled(Text)`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ProfileStats = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 15px;
`;

const ProfileStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 14px;
  color: #333;
`;

const Profile = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(users[0]);
  }, []);

  return (
    <BackgroundContainer>
      <ProfileCard
        cover={<img alt="avatar" src={user.background} />}
      >
        <ProfileInfo>
          <Meta
           avatar={<Avatar size={100} src={user.avatar} />}
            title={<ProfileTitle level={3}>{user.name}</ProfileTitle>}
            description={<ProfileDescription>{user.email}</ProfileDescription>}
          />
          <ProfileStats>
            <ProfileStat>
              <Text strong>Favorite Composer</Text>
              <Text>{user.favoriteComposer || 'Unknown'}</Text>
            </ProfileStat>
            <ProfileStat>
              <Text strong>Followers</Text>
              <Text>{user.followers || 0}</Text>
            </ProfileStat>
            <ProfileStat>
              <Text strong>Following</Text>
              <Text>{user.following || 0}</Text>
            </ProfileStat>
          </ProfileStats>
        </ProfileInfo>
      </ProfileCard>
    </BackgroundContainer>
  );
};

export default Profile;
