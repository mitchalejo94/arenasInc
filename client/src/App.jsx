import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Contact from "./components/Contact";
import ContactForm from "./components/ContactForm";
import Login from "./components/Login";
import Publication from "./components/Publication";
import CompletedContacts from "./components/CompletedContacts";
import PublicationCompleted from "./components/PublicationCompleted";
function App() {
  return (
    <>
      <Router>
        <Link to="/contactForm">Contact Form</Link>
        <Link to="/contactList">Contact List</Link>
        <Routes>
          <Route path="/contactList" element={<Contact />}></Route>
          <Route path="/contactForm" element={<ContactForm />}></Route>
          <Route path="/adminUsers/login" element={<Login />}></Route>
          <Route path="/contactList/:id" element={<Publication />}></Route>
          <Route
            path="/completedContacts/:id"
            element={<PublicationCompleted />}
          ></Route>
          <Route
            path="/completedContacts"
            element={<CompletedContacts />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
