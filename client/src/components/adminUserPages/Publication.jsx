import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { List, Card, Button, Input } from "antd";
import "./Publication.css";

import axios from "axios";

function Publication() {
  let { id } = useParams();
  const [contactText, setContactText] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [status, setStatus] = useState(false);
  const [editedNote, setEditedNote] = useState("");

  let navigate = useNavigate();

  const gridStyle = {
    width: "100%",
    textAlign: "center",
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios
        .get(`http://localhost:3003/Contact/${id}`, {
          headers: {
            accessToken: accessToken,
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
      navigate("/adminUsers/login");
    }
  }, [id, navigate]);

  //Contact Post ======
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
        navigate("/contactList");
      }
    } catch (error) {
      console.error(error, "cant delete publication");
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
      navigate("/contactList");
    } catch (error) {
      console.error(error, "can't transfer to completed list");
    }
  };

  //Notes----
  const addNote = async () => {
    axios
      .post(
        "http://localhost:3003/notes",
        {
          noteBody: newNote,
          ContactId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          const noteToAdd = {
            noteBody: newNote,
            username: response.data.username,
          };
          setNotes([...notes, noteToAdd]);
          setNewNote("");
          // window.location.reload();
        }
      });
  };

  const updateNote = async (id, updatedNote) => {
    try {
      await axios.put(`http://localhost:3003/notes/${id}`, {
        noteBody: updatedNote,
      });
      //     .then(() => {
      //       // window.location.reload();
      //     });
      //   // setStatus(false);
      const updatedNotes = notes.map((note) => {
        if (note.id === id) {
          return { ...note, noteBody: updatedNote };
        }
        return note;
      });
      setNotes(updatedNotes);
    } catch (error) {
      console.error(
        "Error updating note:"
        // error || error.message || error.response
      );
    }
  };

  const deleteNote = (id) => {
    // Remove notes from the state
    setNotes(notes.filter((val) => val.id !== id));
    axios
      .delete(`http://localhost:3003/notes/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        // setNotes(
        //   notes.filter((val) => {
        //     return val.id != id;
        //   })
        // );
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  };
  const handleToggle = () => {
    setStatus((prevStatus) => !prevStatus);
  };
  const handleInputChange = (event) => {
    setEditedNote(event.target.value);
  };

  const handleSave = (noteId) => {
    updateNote(noteId, editedNote);
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${contactText.email}`;
  };
  const handlePhoneClick = () => {
    window.location.href = `tel:${contactText.phoneNumber}`;
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
        <Card.Grid onClick={handlePhoneClick} style={gridStyle}>
          Phone: {contactText.phoneNumber}
        </Card.Grid>
        <Card.Grid onClick={handleEmailClick} style={gridStyle}>
          Email: {contactText.email}
        </Card.Grid>
      </Card>
      <div className="cardButtons">
        <Button onClick={handleDelete}>Delete Publication</Button>
        <Button onClick={transferButton}>Mark as Completed</Button>
      </div>
      <div>
        {/* --------------- */}
        <h1>Notes Section</h1>

        <div className="notesContainer">
          <Input
            type="text"
            placeholder="Notes..."
            value={newNote}
            onChange={(event) => {
              setNewNote(event.target.value);
            }}
          />
          <Button onClick={addNote}>Post note</Button>
        </div>
        {/* ----------- */}
        <List className="">
          <div className="listOfNotes">
            {notes.map((note, key) => {
              return (
                <div key={key} className="note">
                  {status ? (
                    <div>
                      <List.Item>
                        <Input
                          type="text"
                          defaultValue={note.noteBody}
                          onChange={handleInputChange}
                          // onChange={(event) => {
                          //   updateNote(note.id, event.target.value);
                          // }}
                        />
                        <Button
                          onClick={() => {
                            handleSave(note.id);
                            handleToggle();
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          onClick={() => {
                            deleteNote(note.id);
                          }}
                        >
                          Delete
                        </Button>
                      </List.Item>
                    </div>
                  ) : (
                    <div>
                      <List.Item>
                        <span>{note.noteBody}</span>
                        <label> - {note.username} </label>
                        <Button onClick={handleToggle}>Edit</Button>
                      </List.Item>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </List>
      </div>
    </>
  );
}

export default Publication;
