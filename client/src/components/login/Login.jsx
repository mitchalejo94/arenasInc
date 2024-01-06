import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  let navigate = useNavigate();
  const login = () => {
    const data = { username: username, password: password };
    axios
      .post("http://localhost:3003/adminUsers/login", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data);
          navigate("/contactList");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error(error, "Login Error");
        setErrorMessage("Incorrect username and/or password");
      });
  };

  return (
    <div className="loginPage">
      <h1 id="loginTitle">Administrator Login</h1>
      {errorMessage && (
        <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
      )}
      <div className="loginInput">
        <label htmlFor="message">Username:</label>
        <input
          type="text"
          placeholder="Username..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
      </div>
      <div className="loginInput">
        <label htmlFor="message">Password:</label>
        <input
          type="password"
          placeholder="Password..."
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>

      {/* <button id="loginButton" onClick={login}>
        Login
      </button> */}
      <Button id="loginButton" onClick={login}>
        {" "}
        Login
      </Button>
    </div>
  );
}

export default Login;
