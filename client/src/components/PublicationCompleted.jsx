import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { List, Card, Button, Input } from "antd";

function PublicationCompleted() {
  let { id } = useParams();
  const [contactText, setContactText] = useState([]);
  let navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [prevId, setPrevId] = useState(null);

  const gridStyle = {
    width: "100%",
    textAlign: "center",
  };
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && id !== prevId) {
      axios
        .get(`http://localhost:3003/Contact/${id}`, {
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

      setPrevId(id);
    } else if (!accessToken) {
      navigate("/adminUsers/login");
    }
  }, [id, navigate, prevId]);

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this publication?"
      );

      if (confirmDelete) {
        await axios.delete(`http://localhost:3003/Contact/${id}`, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        });
        navigate("/completedContacts");
      }
    } catch (error) {
      console.error(error, "cant delete publication");
      console.error("Error message:", error.response?.data?.error);
    }
  };
  const transferButton = async () => {
    try {
      await axios.post(
        `http://localhost:3003/Contact/activeContact/${id}`,
        contactText,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      navigate("/completedContacts");
    } catch (error) {
      console.error(error, "can't transfer to completed list");
    }
  };

  return (
    <>
      <Card>
        {/* <Card title={"Contact:" {contactText.name}}> */}
        <Card.Grid hoverable={false} style={gridStyle}>
          Contact: {contactText.name}
        </Card.Grid>

        <Card.Grid hoverable={false} style={gridStyle}>
          Message: {contactText.message}
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          City and State: {contactText.cityState}
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          Phone: {contactText.phoneNumber}
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          Email: {contactText.email}
        </Card.Grid>
      </Card>
      <div className="cardButtons">
        <Button onClick={handleDelete}>Delete Publication</Button>
        <Button onClick={transferButton}>Mark as Active</Button>
      </div>

      <h1>Notes Section</h1>
      <div className="listOfNotes">
        {notes.map((note, key) => {
          return (
            <div key={key} className="note">
              <List.Item>
                {note.noteBody}
                <label> - {note.username} </label>
              </List.Item>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default PublicationCompleted;
