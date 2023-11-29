import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Contact from "./components/Contact";
import ContactForm from "./components/ContactForm";
function App() {
  return (
    <>
      <Router>
        <Link to="/contactForm">Contact Form</Link>
        <Link to="/contactList">Contact List</Link>
        <Routes>
          <Route path="/contactList" element={<Contact />}></Route>
          <Route path="/contactForm" element={<ContactForm />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
