import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

function Publication() {
  let { id } = useParams();
  const [contactText, setContactText] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [status, setStatus] = useState(false);
  const [editedNote, setEditedNote] = useState("");

  let navigate = useNavigate();

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
      alert("Please log in to view the Publication.");
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
        }
      });
  };

  const deleteNote = (id) => {
    axios
      .delete(`http://localhost:3003/notes/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setNotes(
          notes.filter((val) => {
            return val.id != id;
          })
        );
      });
  };

  const updateNote = async (id, updatedNote) => {
    try {
      await axios.put(`http://localhost:3003/notes/${id}`, {
        noteBody: updatedNote,
      });
      // setStatus(false);
    } catch (error) {
      console.error(
        "Error updating note:",
        error || error.message || error.response
      );
    }
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

        <button onClick={transferButton}>Mark as Completed</button>
        <div>
          {/* --------------- */}
          <h1>Notes Section</h1>
          <div className="notesContainer">
            <input
              type="text"
              placeholder="Notes..."
              value={newNote}
              onChange={(event) => {
                setNewNote(event.target.value);
              }}
            />
            <button onClick={addNote}>Post note</button>
          </div>
          {/* ----------- */}

          <div className="listOfNotes">
            {notes.map((note, key) => {
              return (
                <div key={key} className="note">
                  {status ? (
                    <div>
                      <input
                        type="text"
                        defaultValue={note.noteBody}
                        onChange={handleInputChange}
                        // onChange={(event) => {
                        //   updateNote(note.id, event.target.value);
                        // }}
                      />
                      <button
                        onClick={() => {
                          handleSave(note.id);
                          handleToggle();
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          deleteNote(note.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <div>
                      <span>{note.noteBody}</span>
                      <button onClick={handleToggle}>Edit</button>
                    </div>
                  )}
                  <label> - {note.username} </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Publication;
