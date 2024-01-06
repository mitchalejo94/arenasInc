import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;

function Footers() {
  const footerStyle = {
    textAlign: "center",
    // color: "#fff",
    color: "rgba(255, 255, 255, 0.65)",
    backgroundColor: "#001529",
  };
  return (
    <Footer theme="dark" style={footerStyle}>
      <h2>Footer</h2>
    </Footer>
  );
}

export default Footers;
