import React, { useState, useEffect, useCallback } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { getDataDashBoard } from "../util/ApiFunction";

const MyBarChart = () => {
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    try {

      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const dateEnd = currentDate.toISOString().split('T')[0];
      const dateStart = new Date(currentDate.setDate(currentDate.getDate() - 7))
        .toISOString()
        .split('T')[0];

      const response = await getDataDashBoard(currentYear, dateStart, dateEnd);

      const transformedData = response.playsInYear.map((monthData) => ({
        month: new Date(2024, monthData.month - 1).toLocaleString('default', { month: 'long' }),
        numberPlays: monthData?.numberPlays || 0, // Fallback to 0 if numberPlays is null
      }));

      setData(transformedData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, []);


  useEffect(() => {
    fetchData();
    console.log(data)
  }, [fetchData]);


  const calculateTickValues = (data, step) => {
    const max = Math.max(...data.map((d) => d.listens));
    const values = [];
    for (let i = 0; i <= max; i += step) {
      values.push(i);
    }
    return values;
  };

  const tickValues = calculateTickValues(data, 30);


  return (
    <ResponsiveBar
      data={data}
      keys={["numberPlays"]}
      indexBy="month"
      margin={{ top: 10, right: 10, bottom: 30, left: 30 }}
      padding={0.5}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ datum: "color" }}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "#fff", modifiers: [["darker", 1.6]] }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Number of plays",
        legendPosition: "middle",
        legendOffset: -40,
        tickValues: tickValues,
      }}
      gridYValues={tickValues}
      defs={[
        {
          id: "gradientA",
          type: "linearGradient",
          colors: [
            { offset: 0, color: "#535C91" },
            { offset: 100, color: "#9290C3" },
          ],
        },
      ]}
      fill={[
        {
          match: "*",
          id: "gradientA",
        },
      ]}
      borderRadius={2}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  );
};

const BarChart = () => (
  <div style={{ height: "160px", width: "100%" }}>
    <MyBarChart />
  </div>
);

export default BarChart;
