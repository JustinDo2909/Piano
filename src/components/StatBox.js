// const StatBox = ({ icon, title, value }) => {
//   return (
//     <div
//       style={{
//         gridColumn: "span 3",
//         gridRow: "span 1",
//         borderRadius: "10px",
//         backgroundColor: "white",
//       }}
//     >
//       <div
//         style={{
//           borderRadius: "0 0 30px 0",
//           height: "20px",
//           width: "70%",
//           backgroundColor: "#A9D372",
//         }}
//       />
//       <div style={{ display: "flex", padding: "1rem" }}>
//         <img
//           src={icon}
//           alt={title}
//           style={{ backgroundColor: "#A9D372", width: "15%" }}
//         />
//         <div style={{ marginLeft: "20px" }}>
//           <div>{title}</div>
//           <div>{value}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StatBox;

import React from "react";
import { Card, Row, Col } from "antd";

const StatBox = ({ icon, title, value }) => {
  return (
    <Card
      bordered={false}
      style={{
        gridColumn: "span 3",
        gridRow: "span 1",
        borderRadius: "10px",
        backgroundColor: "white",
      }}
      bodyStyle={{ padding: "0" }}
    >
      <div
        style={{
          borderRadius: "0 0 30px 0",
          height: "20px",
          width: "70%",
          backgroundColor: "#A9D372",
        }}
      />
      <Row style={{ display: "flex", padding: "1rem" }}>
        <Col>
          <img
            src={icon}
            alt={title}
            style={{
              backgroundColor: "#A9D372",
              width: "60px",
              height: "60px",
              borderRadius: "10px",
            }}
          />
        </Col>
        <Col style={{ marginLeft: "20px" }}>
          <div style={{ fontSize: "16px", fontWeight: "bold" }}>{title}</div>
          <div style={{ fontSize: "24px", marginTop: "8px" }}>{value}</div>
        </Col>
      </Row>
    </Card>
  );
};

export default StatBox;
