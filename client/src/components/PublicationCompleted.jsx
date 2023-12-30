import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PublicationCompleted() {
  let { id } = useParams();
  const [contactText, setContactText] = useState([]);
  let navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  // const [newNote, setNewNote] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios
        .get(`http://localhost:3003/completedContacts/${id}`, {
          headers: {
            accessToken: accessToken, // Pass the token in the request headers
          },
        })
        .then((response) => {
          setContactText(response.data);
        });
      axios
        .get(`http://localhost:3003/notes/${id}`, {
          headers: {
            accessToken: accessToken,
          },
        })
        .then((response) => {
          setNotes(response.data);
        })
        .catch((error) => {
          console.error("Error fetching notes:", error);
        });
    } else {
      alert("Please log in to view the Publication.");
      navigate("/adminUsers/login");
    }
  }, [id, navigate]);

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

  const handleTransferToContacts = async () => {
    try {
      await axios.post(`http://localhost:3003/Contact`, contactText);
      await axios.delete(`http://localhost:3003/completedContacts/${id}`);
      navigate("/completedContacts");
    } catch (error) {
      console.error(error, "can't transfer to Contact list");
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
        <button onClick={handleTransferToContacts}>
          Transfer to ContactList
        </button>
      </div>

      <h1>Notes Section</h1>
      <div className="listOfNotes">
        {notes.map((note, key) => {
          return (
            <div key={key} className="note">
              {note.noteBody}
              <label> - {note.username} </label>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default PublicationCompleted;
