import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function Publication() {
  let { id } = useParams();
  const [contactText, setContactText] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3003/Contact/${id}`).then((response) => {
      console.log(response.data);
      setContactText(response.data);
    });
  }, []);

  return (
    <>
      <h1>Publication ID: {id}</h1>
      <div>
        <div>{contactText.name}</div>
        <div>{contactText.email}</div>
        <div>{contactText.message}</div>
        <div>{contactText.phoneNumber}</div>
        <div>{contactText.cityState}</div>
      </div>
    </>
  );
}

export default Publication;
