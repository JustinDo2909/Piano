import React, { useCallback, useState, useEffect } from "react";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import { getDataDashBoard } from "../../util/ApiFunction";
import {
  Box,
  Card,
  Container,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ZingChart from "../../components/ZingChart";

const data = [
  {
    name: "Vừa Hận Vừa Yêu",
    artist: "Trung Tự",
    percentage: 58,
    image: "link_to_image_1",
  },
  {
    name: "Hứa Đợi Nhưng Chẳng Tới",
    artist: "Lâm Tuấn, Vương Thiên Tuấn",
    percentage: 24,
    image: "link_to_image_2",
  },
  {
    name: "Cô Phòng",
    artist: "Hồ Quang Hiếu, Huỳnh Văn",
    percentage: 18,
    image: "link_to_image_3",
  },
];

const chartData = [
  {
    id: "Vừa Hận Vừa Yêu",
    data: [
      { x: "20:00", y: 50 },
      { x: "22:00", y: 45 },
      { x: "00:00", y: 48 },
      { x: "02:00", y: 45 },
      { x: "04:00", y: 40 },
      { x: "06:00", y: 38 },
      { x: "08:00", y: 35 },
      { x: "10:00", y: 39 },
      { x: "12:00", y: 42 },
      { x: "14:00", y: 48 },
      { x: "16:00", y: 52 },
      { x: "18:00", y: 54 },
      // more data points...
    ],
  },
  {
    id: "Hứa Đợi Nhưng Chẳng Tới",
    data: [
      { x: "20:00", y: 32 },
      { x: "22:00", y: 18 },
      { x: "00:00", y: 22 },
      { x: "02:00", y: 23 },
      { x: "04:00", y: 26 },
      { x: "06:00", y: 24 },
      { x: "08:00", y: 27 },
      { x: "10:00", y: 30 },
      { x: "12:00", y: 26 },
      { x: "14:00", y: 28 },
      { x: "16:00", y: 30 },
      { x: "18:00", y: 32 },
      // more data points...
    ],
  },
  {
    id: "Cô Phòng",
    data: [
      { x: "20:00", y: 18 },
      { x: "22:00", y: 19 },
      { x: "00:00", y: 18 },
      { x: "02:00", y: 17 },
      { x: "04:00", y: 18 },
      { x: "06:00", y: 15 },
      { x: "08:00", y: 20 },
      { x: "10:00", y: 26 },
      { x: "12:00", y: 32 },
      { x: "14:00", y: 38 },
      { x: "16:00", y: 35 },
      { x: "18:00", y: 30 },
      // more data points...
    ],
  },
];

const Home = () => {
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [dataStat, setDataStat] = useState([]);

  const fetchDataStat = useCallback(async () => {
    try {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const dateEnd = currentDate.toISOString().split('T')[0];
      const dateStart = new Date(currentDate.setDate(currentDate.getDate() - 7))
        .toISOString()
        .split('T')[0];

      const response = await getDataDashBoard(currentYear, dateStart, dateEnd);
      setDataStat(response)
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, [])

  useEffect(() => {
    fetchDataStat();
  }, [fetchDataStat]);

  return (
    <Box>
      <Box
        sx={{
          padding: "1.5rem"
        }}
      >
        <Box
          display="grid"
          gridTemplateColumns="repeat(16, 1fr)"
          gridAutoRows="90px"
          gap="20px"
          sx={{
            "& > div": {
              gridColumn: isNonMediumScreens ? undefined : "span 12",
            },
          }}
        >
          <StatBox
            icon={<PersonPinIcon
              sx={{ fontSize: "34px", color: "#83e" }}
            />}
            title={"Artists"}
            value={dataStat.artistNumber || 0}
          />
          <StatBox
            icon={<LibraryMusicIcon
              sx={{ fontSize: "34px", color: "#83e" }}
            />}
            title={"Total of music"}
            value={dataStat.numberSong || 0}
          />

          <Box
            sx={{
              gridColumn: "span 10",
              gridRow: "span 2",
              borderRadius: "10px",
              backgroundColor: "white",
              padding: "10px",
              boxShadow: " -1px 1px 5px #89a",
              overflow: "hidden",
              boxSizing: "border-box"
            }}
          >
            <Typography variant="h5">Total plays</Typography>
            <BarChart />
          </Box>

          <StatBox
            icon={<SubscriptionsOutlinedIcon
              sx={{ fontSize: "34px", color: "#83e" }}
            />}
            title={"Total of plays"}
            value={dataStat.numberPlays || 0}
          />
          <StatBox
            icon={<PersonOutlineOutlinedIcon
              sx={{ fontSize: "34px", color: "#83e" }}
            />}
            title={"Total of user"}
            value={dataStat.userNumber || 0}
          />
          <ZingChart
            data={data}
            chartData={chartData}
            isNonMediumScreens={isNonMediumScreens}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
