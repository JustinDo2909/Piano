import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { ResponsiveLine } from "@nivo/line";

const ZingChart = ({ data, chartData, isNonMediumScreens }) => {
  return (
    <Box
      gridColumn="span 12"
      gridRow={isNonMediumScreens ? "span 5" : "span 7"}
      sx={{
        backgroundColor: "#1B1A55",
        color: "white",
        fontFamily: "Arial, sans-serif",
        borderRadius: 2,
        padding: 3,
        // width: "100rem",
        // maxWidth: 1000,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4">#Top Song</Typography>
      </Box>
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {data.map((item, index) => (
              <Card
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#364283",
                  borderRadius: 1,
                  padding: "10px 15px",
                  color: "white",
                  // width: "100%",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    marginRight: 2,
                    WebkitTextStroke: "1px red",
                    color: "#364283",
                  }}
                >
                  {index + 1}
                </Typography>
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.name}
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 1,
                    marginRight: 2,
                  }}
                />
                <CardContent
                  sx={{
                    padding: 0,
                    flexGrow: 1,
                    "&:last-child": { paddingBottom: 0 },
                  }}
                >
                  <Typography variant="h6" sx={{ marginBottom: 0.5 }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#ccc" }}>
                    {item.artist}
                  </Typography>
                </CardContent>
                <Typography variant="h5" sx={{ marginLeft: 2 }}>
                  {item.percentage}%
                </Typography>
              </Card>
            ))}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#364283",
                borderRadius: "999px",
                color: "#fff",
                width: "50%",
                margin: "0 auto",
                border: "1px solid #fff",
                WebkitBoxSizing: "border-box",
                ":hover": {
                  backgroundColor: "hsla(0, 0%, 100%, .1)",
                },
              }}
            >
              Show More
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box sx={{ height: 400 }}>
            <ResponsiveLine
              data={chartData}
              theme={{
                axis: {
                  domain: {
                    line: {
                      stroke: "#ffedc2",
                    },
                  },
                  legend: {
                    text: {
                      fill: "#ffedc2",
                    },
                  },
                  ticks: {
                    line: {
                      stroke: "#ffedc2",
                      strokeWidth: 1,
                    },
                    text: {
                      fill: "#ffedc2",
                    },
                  },
                },
                legends: {
                  text: {
                    fill: "#ffedc2",
                  },
                },
                tooltip: {
                  container: {
                    color: "#4d547d",
                  },
                },
              }}
              margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,
                reverse: false,
              }}
              yFormat=" >-.2f"
              curve="catmullRom"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "",
                legendOffset: 36,
                legendPosition: "middle",
              }}
              axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "",
                legendOffset: -50,
                legendPosition: "middle",
              }}
              enableGridX={false}
              // enableGridY={false}
              pointSize={10}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabelYOffset={-12}
              useMesh={true}
              legends={[]}
              // theme={{
              //   textColor: "#fff",
              //   axis: {
              //     ticks: {
              //       line: {
              //         stroke: "#555555",
              //       },
              //       text: {
              //         fill: "#fff",
              //       },
              //     },
              //   },
              // }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ZingChart;
