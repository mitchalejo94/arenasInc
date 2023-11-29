import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
function Contact() {
  const [listOfContact, setListOfContact] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3003/Contact").then((response) => {
      setListOfContact(response.data);
    });
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
