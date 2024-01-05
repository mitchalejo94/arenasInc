import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Contact from "./components/Contact";
import ContactForm from "./components/ContactForm";
import Login from "./components/Login";
import Publication from "./components/Publication";
import CompletedContacts from "./components/CompletedContacts";
import PublicationCompleted from "./components/PublicationCompleted";
import Headers from "./components/Headers";
function App() {
  return (
    <>
      <Router>
        <Headers />

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
