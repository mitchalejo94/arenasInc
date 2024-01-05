import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card } from "antd";

function CompletedContacts() {
  const [contactData, setContactData] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios
        .get(`http://localhost:3003/Contact`, {
          headers: {
            accessToken: accessToken, // Pass the token in the request headers
          },
        })
        .then((response) => {
          const activeContact = response.data.filter(
            (contact) => contact.activeContact !== true
          );
          setContactData(activeContact);
        });
    } else {
      alert("Please log in to view the completed contact list.");
      navigate("/adminUsers/login");
    }
  }, [navigate]);

  return (
    <>
      <h1>Completed Contacts</h1>
      <div>
        {contactData.map((contact, key) => (
          <Card
            key={key}
            title={contact.cityState}
            bordered={false}
            style={{
              width: 300,
              margin: "10px",
              background: "#8d99ae",
              color: "#edf2f4",
            }}
            onClick={() => {
              navigate(`/completedContacts/${contact.id}`);
            }}
          >
            <div>Name: {contact.name}</div>

            <div>{contact.createdAt}</div>
          </Card>
        ))}
      </div>
    </>
  );
}

export default CompletedContacts;
