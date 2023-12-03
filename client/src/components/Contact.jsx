import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Contact() {
  const [listOfContact, setListOfContact] = useState([]);
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
        })
        .catch((error) => {});
    } else {
      window.alert("Please log in to view the contact list.");
      navigate("/adminUsers/login");
    }
  }, []);

  return (
    <div>
      {listOfContact.map((value, key) => {
        return (
          <div key={key}>
            <div> {value.message}</div>
            <div> {value.name}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Contact;
