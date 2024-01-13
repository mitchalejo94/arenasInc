import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Contact from "./components/Contact";
import Login from "./components/login/Login";
import Publication from "./components/publications/Publication";
import CompletedContacts from "./components/CompletedContacts";
import PublicationCompleted from "./components/PublicationCompleted";
import Headers from "./components/Headers";
import Home from "./components/homePageFiles/Home";
import Footers from "./components/footer/Footers";
import Title from "./components/Title";

import { Layout } from "antd";
const { Content } = Layout;

function App() {
  return (
    <>
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Title />
          <Headers />
          <Content style={{ padding: "0 50px" }}>
            <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
              <Routes>
                <Route path="/contactList" element={<Contact />}></Route>
                <Route path="/adminUsers/login" element={<Login />}></Route>
                <Route
                  path="/contactList/:id"
                  element={<Publication />}
                ></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route
                  path="/completedContacts/:id"
                  element={<PublicationCompleted />}
                ></Route>
                <Route
                  path="/completedContacts"
                  element={<CompletedContacts />}
                ></Route>
              </Routes>
            </div>
          </Content>
          <Footers />
        </Layout>
      </Router>
    </>
  );
}

export default App;
