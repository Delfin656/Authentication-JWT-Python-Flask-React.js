import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const sendData = (event) => {
    event.preventDefault();
    actions.login(email, password);
  };

  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      navigate("/");
    }
  }, [store.token]);

  /*  if (store.token && store.token !== "" && store.token !== undefined) {
    navigate("/");
  }
 */
  return (
    <div className="login mt-2">
      <h1 className="text-center">Login</h1>
      {!(store.token && store.token != "" && store.token != undefined) && (
        <div>
          <form onSubmit={sendData}>
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
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <input
              className="btn btn-primary w-100"
              type="submit"
              value="LOGIN"
            />
          </form>
          <Link to="/signup" className="text-decoration-none">
            <div className="fs-4 text-light">not registered? Signup</div>
          </Link>
        </div>
      )}
    </div>
  );
};
