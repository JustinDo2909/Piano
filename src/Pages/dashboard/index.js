import React from "react";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
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

  return (
    <Box sx={{ padding: "1rem" }}>
      <Box
        sx={{
          padding: "1rem",
          boxShadow: "-3px 4px 6.8px 5px #00000040",
          background: "#535C91",
          borderRadius: "8px",
        }}
      >
        <Box
          display="grid"
          gridTemplateColumns="repeat(16, 1fr)"
          gridAutoRows="100px"
          gap="20px"
          sx={{
            "& > div": {
              gridColumn: isNonMediumScreens ? undefined : "span 12",
            },
          }}
        >
          <StatBox icon={LibraryMusicIcon} title={"Artists"} value={"24"} />
          <StatBox
            icon={LibraryMusicIcon}
            title={"Total of music"}
            value={"128"}
          />

          <Box
            sx={{
              gridColumn: "span 10",
              gridRow: "span 2",
              borderRadius: "10px",
              backgroundColor: "white",
              padding: "10px",
            }}
          >
            {/* <BarChart /> */}
          </Box>

          <StatBox
            icon={LibraryMusicIcon}
            title={"Total of plays"}
            value={"1028"}
          />
          <StatBox
            icon={LibraryMusicIcon}
            title={"Total time played"}
            value={"1920.6 hours"}
          />
          {/* <Card sx={{ p: "1rem", gridColumn: "span 12", gridRow: "span 2" }}>
            <Typography variant="h6" gutterBottom>
              Most Played Songs
            </Typography>
            <PieChart isDashboard={true} />
          </Card> */}

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
