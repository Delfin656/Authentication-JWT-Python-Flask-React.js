import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const sendData = (event) => {
    event.preventDefault();
    actions.register(name, email, password);
    if (name != "" && email != "" && password != "") navigate("/login");
  };

  return (
    <div className="login mt-2">
      <h1 className="text-center">Signup</h1>
      <form onSubmit={sendData}>
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value.trim())}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email address</label>
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value.trim())}
          />
        </div>
        <input className="btn btn-primary w-100" type="submit" value="SIGNUP" />
      </form>
    </div>
  );
};
