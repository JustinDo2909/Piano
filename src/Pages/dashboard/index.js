import React from "react";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import StatBox from "../../components/StatBox";
import Artist from "../../image/37e3588512a03e0ef7d30450fe386172.png";
import TotalMusic from "../../image/80f796db14696e02abe0f2cc081fcd27.png";
import TotalTime from "../../image/efe879c73aa17261d6e2141a92cfa727.png";
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

  const barChartData = {
    labels: [
      "Jan",
      "Fer",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Number of Plays",
        data: [100, 200, 300, 400, 500, 600, 500, 400, 100, 200, 150, 700],
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "#1B1A55");
          gradient.addColorStop(1, "#9290C3");
          return gradient;
        },
        borderWidth: 0,
        borderRadius: 15,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Number of Plays per Month",
      },
    },
  };

  return (
    <Box sx={{ padding: "1rem" }}>
      <Box
        sx={{
          padding: "1rem",
          boxShadow: "-3px 4px 6.8px 5px #00000040",
          background: "#D9D9D9",
          borderRadius: "8px",
        }}
      >
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="100px"
          gap="20px"
          sx={{
            "& > div": {
              gridColumn: isNonMediumScreens ? undefined : "span 12",
            },
          }}
        >
          <StatBox icon={Artist} title={"Artists"} value={"24"} />
          <StatBox icon={TotalMusic} title={"Total of music"} value={"128"} />

          <Box
            sx={{
              gridColumn: "span 6",
              gridRow: "span 2",
              borderRadius: "10px",
              backgroundColor: "white",
              padding: "10px",
            }}
          >
            <BarChart data={barChartData} options={barChartOptions} />
          </Box>

          <StatBox icon={Artist} title={"Total of plays"} value={"1028"} />
          <StatBox
            icon={TotalTime}
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
