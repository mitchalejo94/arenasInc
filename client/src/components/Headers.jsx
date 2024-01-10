import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
const { Header } = Layout;

function Headers() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  let navigate = useNavigate;

  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
    navigate("/adminUsers/login");
  };

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="demo-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        {!loggedIn ? (
          <Menu.Item key="adminLogin">
            <Link to="/adminUsers/login">Admin Login</Link>
          </Menu.Item>
        ) : (
          <Menu.Item>
            <Link onClick={logout}>Logout</Link>
          </Menu.Item>
        )}

        {loggedIn && (
          <Menu.Item key="contactList">
            <Link to="/contactList">Contact List-Active</Link>
          </Menu.Item>
        )}
        {loggedIn && (
          <Menu.Item key="contactListCompleted">
            <Link to="/completedContacts">Contact List-Completed</Link>
          </Menu.Item>
        )}
        {!loggedIn && (
          <Menu.Item key="home">
            <Link to="/home">Home</Link>
          </Menu.Item>
        )}
        {!loggedIn && (
          <Menu.Item key="aboutUs">
            {/* <Link to="/aboutus">About Us </Link> */}
            <a href="#aboutUsPage">About Us</a>
          </Menu.Item>
        )}
        {!loggedIn && (
          <Menu.Item key="contactForm">
            <a href="#contactFormPage">Contact Us</a>
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
}

export default Headers;
