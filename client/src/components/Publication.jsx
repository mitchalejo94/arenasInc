import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";

function Publication() {
  let { id } = useParams();
  const [contactText, setContactText] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
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
    } else {
      alert("Please log in to view the Publication.");
      navigate("/adminUsers/login");
    }
  }, [id, navigate]);

  const addNote = () => {
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
          // setNotes((prevNotes) => [...prevNotes, noteToAdd]);
          setNewNote("");
        }
      });
  };

  // const deleteNote=()=>{

  // }

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

  // const handleTransferToCompleted = async () => {
  //   try {
  //     await axios.post(`http://localhost:3003/completedContacts`, contactText);
  //     await axios.delete(`http://localhost:3003/Contact/${id}`);
  //     navigate("/contactList");
  //   } catch (error) {
  //     console.error(error, "can't transfer to completed list");
  //   }
  // };

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
      // navigate("/contactList");
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
        {/* <button
          onClick={() => {
            handleTransferToCompleted();
            // handleDelete();
          }}
        >
          Transfer to Completed Projects
        </button> */}
        <button onClick={transferButton}>transfer</button>
        <div>
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
        </div>
      </div>
    </>
  );
}

export default Publication;
