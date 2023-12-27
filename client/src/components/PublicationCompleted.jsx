import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PublicationCompleted() {
  let { id } = useParams();
  const [contactText, setContactText] = useState({});
  let navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3003/completedContacts/${id}`)
      .then((response) => {
        setContactText(response.data);
      });
  }, []);
  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this publication?"
      );

      if (confirmDelete) {
        await axios.delete(`http://localhost:3003/completedContacts/${id}`);
        navigate("/completedContacts");
      }
    } catch (error) {
      console.error(error, "cant delete publication");
      console.error("Error message:", error.response?.data?.error);
    }
  };
  return (
    <>
      <h1>Completed Publication ID: {id}</h1>
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

export default PublicationCompleted;
