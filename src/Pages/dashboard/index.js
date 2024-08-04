import React from "react";
import { Layout, Row, Col, Card, Typography } from "antd";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import StatBox from "../../components/StatBox";
import Artist from "../../image/37e3588512a03e0ef7d30450fe386172.png";
import TotalMusic from "../../image/80f796db14696e02abe0f2cc081fcd27.png";
import TotalTime from "../../image/efe879c73aa17261d6e2141a92cfa727.png";

const { Content } = Layout;
const { Title, Text } = Typography;

const Home = () => {
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
          gradient.addColorStop(0, "#3A412F");
          gradient.addColorStop(1, "#95A779");
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
    <Content
      style={{
        padding: "10px",
        boxShadow: "-3px 4px 6.8px 5px #00000040",
        background: "#D9D9D9",
        borderRadius: "8px",
        // minHeight: "100%",
      }}
    >
      {/* <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card
            title="Most Played Songs"
            style={{ borderRadius: "8px", height: "100%" }}
          >
            <div style={{ height: "312px" }}>
              <BarChart isDashboard={true} />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Most Favorite Song"
            style={{ borderRadius: "8px", height: "100%" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {[
                  { rank: 1, color: "#B8EF71", name: "#Name Top 1 Music Song" },
                  { rank: 2, color: "#A9D373", name: "#Name Top 2 Music Song" },
                  { rank: 3, color: "#75924F", name: "#Name Top 3 Music Song" },
                  { rank: "...", color: "#8E9289", name: "#Other Song" },
                ].map(({ rank, color, name }) => (
                  <div
                    key={rank}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div
                      style={{
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                        background: color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: "28px",
                      }}
                    >
                      {rank}
                    </div>
                    <Text
                      style={{
                        marginLeft: "20px",
                        fontStyle: "italic",
                        fontSize: "22px",
                      }}
                    >
                      {name}
                    </Text>
                  </div>
                ))}
              </div>
              <div style={{ height: "312px" }}>
                <PieChart />
              </div>
            </div>
          </Card>
        </Col>
      </Row> */}
      <div
        style={{
          // marginTop: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridAutoRows: "140px",
          gap: "20px",
        }}
      >
        <StatBox icon={Artist} title={"Artists"} value={"24"} />
        <StatBox icon={TotalMusic} title={"Total of music"} value={"128"} />
        <Card
          title="Most Played Songs"
          style={{ gridColumn: "span 6", gridRow: "span 2", p: "1rem" }}
        >
          <div>
            <PieChart isDashboard={true} />
          </div>
        </Card>

        <StatBox icon={Artist} title={"Total of plays"} value={"1028"} />
        <StatBox
          icon={TotalTime}
          title={"Total time played"}
          value={"1920.6 hours"}
        />

        <div
          style={{
            gridColumn: "span 12",
            gridRow: "span 2",
            borderRadius: "10px",
            backgroundColor: "white",
            padding: "10px",
          }}
        >
          <BarChart data={barChartData} options={barChartOptions} />
        </div>
      </div>
    </Content>
  );
};

export default Home;
