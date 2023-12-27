// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// // import { use } from "../../../server/routes/CompletedContacts";

// function CompletedContacts() {
//   let { contactId } = useParams();
//   const [contactData, setContactData] = useState({});

//   useEffect(() => {
//     //need to redirect to completed
//     axios.get(`http://localhost:3003/completedContacts`).then((response) => {
//       setContactData(response.data);
//     });
//   }, []);
//   return (
//     <>
//       {/* <h1>Publication ID: {id}</h1> */}
//       <div>
//         <div>{contactData.updatedAt}</div>
//         <div>{contactData.contactId}</div>
//       </div>
//     </>
//   );
// }

// export default CompletedContacts;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CompletedContacts() {
  const [contactData, setContactData] = useState([]);
  const { contactId } = useParams();

  useEffect(() => {
    // Fetch completed contacts
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
            <div>UpdatedAt: {contact.updatedAt}</div>
            <div>ContactId: {contact.contactId}</div>
            {/* Render other properties as needed */}
          </div>
        ))}
      </div>
    </>
  );
}

export default CompletedContacts;
