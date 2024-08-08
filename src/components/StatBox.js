import React from "react";
import { Card, Row, Col } from "antd";
import FlexBetween from "./FlexBetween";
import { Box, Paper, Typography } from "@mui/material";

const StatBox = ({ icon, title, value }) => {
  return (
    <Box
      gridColumn="span 3"
      gridRow="span 1"
      borderRadius="0.5rem"
      display="flex"
      flex="1 1 100%"
      backgroundColor="white"
      flexDirection="column"
      component={Paper}
    >
      <Box
        style={{
          borderRadius: "1rem 0 30px 0",
          height: "1rem",
          width: "80%",
          backgroundColor: "#7a7f9d",
        }}
      />

      <FlexBetween sx={{ p: "1rem" }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" sx={{ color: "#1B1A55" }}>
            {value}
          </Typography>
          <Typography style={{ fontSize: "16px", color: "#333333" }}>
            {title}
          </Typography>
        </Box>
        <Box
          style={{ fontSize: "3em", height: "100%", color: "#535C91" }}
        ></Box>
      </FlexBetween>
    </Box>
  );
};

export default StatBox;
