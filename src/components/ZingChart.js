import React from "react";
import { ResponsiveLine } from "@nivo/line";
import "./ZingChart.css";

const ZingChart = ({ data, chartData }) => {
  return (
    <div className="zingchart-container">
      <div className="zingchart-header">
        <h1>#zingchart</h1>
        <button className="play-button">▶</button>
      </div>
      <div className="zingchart-content">
        <div className="zingchart-list">
          {data.map((item, index) => (
            <div key={index} className="zingchart-item">
              <div className="zingchart-rank">{index + 1}</div>
              <img
                src={item.image}
                alt={item.name}
                className="zingchart-image"
              />
              <div className="zingchart-info">
                <div className="zingchart-title">{item.name}</div>
                <div className="zingchart-artist">{item.artist}</div>
              </div>
              <div className="zingchart-percentage">{item.percentage}%</div>
            </div>
          ))}
          <button className="zingchart-more">Xem thêm</button>
        </div>
        <div className="zingchart-chart">
          <ResponsiveLine
            data={chartData}
            margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: true,
              reverse: false,
            }}
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
              legendOffset: -40,
              legendPosition: "middle",
            }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[]}
            theme={{
              textColor: "#fff",
              axis: {
                ticks: {
                  line: {
                    stroke: "#555555",
                  },
                  text: {
                    fill: "#fff",
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ZingChart;
