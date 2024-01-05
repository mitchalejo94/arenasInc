import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { logout } from "./Logout";

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
        // console.log(response.data);
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data);
          navigate("/contactList");
        }
      })
      .catch((error) => {
        console.error(error, "Login Error");
        setErrorMessage("Incorrect username and/or password");
      });
  };

  return (
    <div>
      <h1>Login Page</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <label htmlFor="message">Username:</label>
      <input
        type="text"
        placeholder="Username..."
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label htmlFor="message">Password:</label>
      <input
        type="password"
        placeholder="Password..."
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button onClick={login}>Login</button>
      {/* <button onClick={logout}>Logout</button> */}
    </div>
  );
}

export default Login;
