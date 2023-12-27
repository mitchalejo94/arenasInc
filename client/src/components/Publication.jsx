import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Publication() {
  let { id } = useParams();
  const [contactText, setContactText] = useState({});
  let navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:3003/Contact/${id}`).then((response) => {
      setContactText(response.data);
    });
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3003/Contact/${id}`);
      navigate("/contactList");
    } catch (error) {
      console.error(error, "cant delete publication");
    }
  };

  return (
    <>
      <h1>Publication ID: {id}</h1>
      <div>
        <div>{contactText.name}</div>
        <div>{contactText.email}</div>
        <div>{contactText.message}</div>
        <div>{contactText.phoneNumber}</div>
        <div>{contactText.cityState}</div>
        <button onClick={handleDelete}>Delete Publication</button>
      </div>
    </>
  );
}

export default Publication;
