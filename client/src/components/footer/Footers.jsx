import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;
import "./Footer.css";

function Footers() {
  return (
    <Footer className="footerContainer">
      <div>
        <img
          className="footerLogo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Thunderbolt_%28slash%29.svg/415px-Thunderbolt_%28slash%29.svg.png"
          alt=""
        />
      </div>
      <div className="footerName">
        <h2>Business Name</h2>
      </div>
    </Footer>
  );
}

export default Footers;
