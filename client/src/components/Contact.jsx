import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Alert, Space } from "antd";

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
          const activeContact = response.data.filter(
            (contact) => contact.activeContact === true
          );
          setListOfContact(activeContact);
        });
    } else {
      navigate("/adminUsers/login");
    }
  }, [navigate]);

  return (
    <div>
      <div>
        <h1>ContactList Page</h1>
      </div>
      <div>
        {listOfContact.map((value, key) => (
          <Card
            key={key}
            title={value.cityState}
            bordered={false}
            style={{
              width: 300,
              margin: "10px",
              background: "#8d99ae",
              color: "#edf2f4",
            }}
            onClick={() => {
              navigate(`/contactList/${value.id}`);
            }}
          >
            <div>Name: {value.name}</div>
            <div>{value.createdAt}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Contact;
