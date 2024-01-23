import React, { useEffect, useState } from "react";
import { Calendar, Badge } from "antd";
import { useNavigate } from "react-router-dom";

function Schedule() {
  const [authenticated, setAuthenticated] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setAuthenticated(true);
    } else {
      navigate("/adminUsers/login");
    }
  }, []);
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  return (
    <>
      <Calendar onPanelChange={onPanelChange} />;
    </>
  );
}

export default Schedule;
