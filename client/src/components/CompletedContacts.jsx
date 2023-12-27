import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function CompletedContacts() {
  const [contactData, setContactData] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:3003/completedContacts`).then((response) => {
      setContactData(response.data);
    });
  }, []);

  return (
    <>
      <h1>Completed Contacts</h1>
      <div>
        {contactData.map((contact, index) => (
          <div key={index}>
            <div
              onClick={() => {
                navigate(`/completedContacts/${contact.id}`);
              }}
            >
              <div>UpdatedAt: {contact.updatedAt}</div>

              <div>Name: {contact.name}</div>
              <div>Message: {contact.message}</div>
              <div>City and State: {contact.cityState}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CompletedContacts;
