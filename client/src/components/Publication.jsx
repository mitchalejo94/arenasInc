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
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this publication?"
      );

      if (confirmDelete) {
        await axios.delete(`http://localhost:3003/Contact/${id}`);
        navigate("/contactList");
      }
    } catch (error) {
      console.error(error, "cant delete publication");
    }
  };

  const handleTransferToCompleted = async () => {
    try {
      await axios.post(`http://localhost:3003/completedContacts`, contactText);
      await axios.delete(`http://localhost:3003/Contact/${id}`);
      navigate("/contactList");
    } catch (error) {
      console.error(error, "can't transfer to completed list");
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
        <button onClick={handleTransferToCompleted}>
          Transfer to Completed Projects
        </button>
      </div>
    </>
  );
}

export default Publication;
