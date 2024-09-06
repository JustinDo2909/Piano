import React from "react";
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
      justifyContent="space-between"
      overflow="hidden"
      boxShadow=" -1px 1px 5px #89a"
      component={Paper}
    >
      <Box
        style={{
          height: "0.75rem",
          width: "100%",
          backgroundColor: '#83e',
        }}
      />

      <FlexBetween sx={{ p: "0.75rem" }}>
        <Box>
          <Typography fontSize="22px" fontWeight="bold" sx={{ color: "#83e", }}>
            {value}
          </Typography>
          <Typography style={{ fontSize: "14px", color: "#678" }}>
            {title}
          </Typography>
        </Box>
        <Box> {icon}</Box>
      </FlexBetween>
    </Box>
  );
};

export default StatBox;
