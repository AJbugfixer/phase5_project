import React, { useEffect, useState, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
// import axios from "axios";
import { getUser, initialize } from "../services/User";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState("");

  const his = useHistory();
  const checkAuth = async () => {
    if (localStorage.getItem("Ecomtoken")) {
      await initialize();
      getUser(localStorage.getItem("Ecomtoken")).then((user) => {
        if (user) his.push("/home");
      });
    }
  };

  useEffect(() => {
    checkAuth();
    return function () {};
  }, []);

  const onSub = async (e) => {
    e.preventDefault();

    getUser(email)
      .then((user) => {
        if (!user) {
          setStatus(true);
          setMsg("No user found with provided email!");
        } else if (user.password != password) {
          setStatus(true);
          setMsg("Invalid email or password!");
        } else {
          localStorage.setItem("Ecomtoken", user.email);
          localStorage.setItem("EcomUser", user.name);
          localStorage.setItem("EcomUserId", user.email);
          localStorage.setItem("EcomEmail", user.email);
          his.push("/home");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-12 mx-auto mb-3">
              {status ? (
                <>
                  <div className="alert alert-danger alert-dismissible fade show ">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                      onClick={() => setStatus(false)}
                    >
                      &times;
                    </button>
                    <p>{msg}</p>
                  </div>
                </>
              ) : null}
              <br />
              <h2 className="text-center">Login Now</h2>
              <form onSubmit={onSub}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-info">
                  Login
                </button>
              </form>
              <br />
              <NavLink to="/register">Register Now</NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
