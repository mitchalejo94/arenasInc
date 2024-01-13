import React from "react";
import "./Title.css";

function Title() {
  return (
    <>
      <div className="titleContainer">
        <div className="titleName">
          <h1>Business Name</h1>
        </div>
        <div className="logo">
          <img
            className="footerLogo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Thunderbolt_%28slash%29.svg/415px-Thunderbolt_%28slash%29.svg.png"
            alt=""
            style={{
              height: "9rem",
              width: "8rem",
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Title;
