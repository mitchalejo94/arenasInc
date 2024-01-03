import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Contact() {
  const [listOfContact, setListOfContact] = useState([]);
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  let navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      axios
        .get("http://localhost:3003/Contact", {
          headers: {
            accessToken: accessToken, // Pass the token in the request headers
          },
        })
        .then((response) => {
          setListOfContact(response.data);
        });
      // .catch((error) => {});
    } else {
      alert("Please log in to view the contact list.");
      navigate("/adminUsers/login");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
    navigate("/adminUsers/login");
  };
  return (
    <div>
      <button onClick={logout}>Logout</button>
      <Link to="/completedContacts">Completed Projects/Contacts</Link>
      <div>
        <h1>ContactList Page</h1>
      </div>
      {listOfContact.map((value, key) => (
        <div key={key}>
          <div
            onClick={() => {
              navigate(`/contactList/${value.id}`);
            }}
          >
            <div>{value.message}</div>
            <div>{value.name}</div>
            <div>{value.createdAt}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Contact;
