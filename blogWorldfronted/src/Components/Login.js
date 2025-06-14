import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login(props) {
  const [crediantial, setCrediantial] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { logged, setLogged, showAlert } = props;
  
  // Check user already login or not
  useEffect(() => {
    if (logged) {
      navigate("/createblog");
    }
  }, []);

  // Login by User
  const handleForm = async (e) => {
    e.preventDefault();
    if (!logged) {
      try {
        // if (!sessionStorage.getItem("bw_auth_token")) window.location.reload();
        const response = await fetch("http://localhost:8900/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "bw_auth_token": sessionStorage.getItem("bw_auth_token"),
          },
          body: JSON.stringify({
            username: crediantial.username,
            password: crediantial.password,
          }),
        });
        const data = await response.json();
// console.log(data)
        if (data.success) {
          sessionStorage.setItem("auth-token", data.authToken);
          navigate("/profile");
          showAlert("success", "Login Successfully");
          setLogged(true);
          window.location.reload();
        } else {
          setCrediantial({ username: "", password: "" });
          navigate("/login");
          setLogged(false);
          showAlert("danger", "Login Failed");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/createblog");
    }
  };

  const onchange = (e) => {
    setCrediantial({ ...crediantial, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="my-3 mainContainer">
        <div className="container df text-light p-1 flex-column rounded login-main-box">
          <div className="df container p-2 m-2 login-head">
            <h1>Login</h1>
          </div>
          <div className="df flex-wrap-reverse justify-content-evenly login-process">
            <div className="df flex-column m-3 p-2 rounded login-part signup-part">
              <div className="text-light login-form signup-form">
                <form onSubmit={handleForm} method="post">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Enter Username
                    </label>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        @
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        required
                        placeholder="Username"
                        name="username"
                        onChange={onchange}
                        value={crediantial.username}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      required
                      onChange={onchange}
                      value={crediantial.password}
                      className="form-control"
                      aria-describedby="passwordHelpBlock"
                    />
                  </div>
                  <div className="mb-3">
                    <div className="df justify-content-between">
                      <Link to={"/signup"} className="btn btn-primary btnMe">
                        Sign Up
                      </Link>
                      <button type="submit" className="btn btn-primary btnMe">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="df flex-column p-2 rounded login-content-part">
              <div className="m-3 login-content-head">
                <h1>Welcome to blogWorld</h1>
                <p className="text">
                  Login with Complete Authentication Process.
                </p>
              </div>
              <div className="login-main-content">
                <p className="px-3 m-3 txt">
                  This Process is for your Security because without your
                  permissions no any changes came in your blogs and your
                  comments of other blogs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
