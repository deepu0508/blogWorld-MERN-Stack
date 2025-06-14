import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";

export default function SignUp(props) {
  const form = useRef();
  const ref = useRef();
  const [crediantial, setCrediantial] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    mailid: "",
  });
  const [otpEtc, setOtpEtc] = useState();
  const [CFOTP, setCFOTP] = useState({ otp: "", mailid: "" });
  const { name, username, email, password } = crediantial;
  const navigate = useNavigate();

  const inputTaking = async (e) => {
    try {
      e.preventDefault();
      let check = true;
      setOtpEtc("");
      $("#inputaking").disabled = true;

      name && username && email && password ? (check = true) : (check = false);

      if (check) {
        const response = await fetch(
          "http://localhost:8900/direct/mail/sendmail",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              "bw_auth_token": sessionStorage.getItem("bw_auth_token"),
            },
            body: JSON.stringify({ email }),
          }
        );
        const data = await response.json();
        if (data.success) {
          props.showAlert("success", "OTP send Successfully");
          setCFOTP({ otp: data.otp, mailid: data.messageId });
          ref.current.click();
        } else {
          props.showAlert("danger", "OTP send Failed");
        }
      } else {
        props.showAlert("danger", "Please fill all details");
      }
    } catch (error) {
      props.showAlert("danger", "Please fill all details with Errors: "+error);
    }
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      if (String(CFOTP) === otpEtc) {
        const response = await fetch(
          "http://localhost:8900/api/auth/createuser",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              "bw_auth_token": sessionStorage.getItem("bw_auth_token"),
            },
            body: JSON.stringify({
              name,
              username,
              email,
              password,
              mailid: CFOTP.mailid,
            }),
          }
        );
        const data = await response.json();

        if (data.success) {
          props.showAlert("success", "Your account successfully created!");
          sessionStorage.setItem("auth-token", data.authToken);
          navigate("/profile");
          props.setLogged(true);
          window.location.reload();
          // navigate("/login");
        } else {
          navigate("/signup");
          props.showAlert(
            "danger",
            "Sorry, This Username or email id user already exits or other problem!"
          );
        }
        ref.current.click();
      } else {
        props.showAlert("danger", "OTP Invalid");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkName = () => {
    if (String(name).match(/[^a-z]/gi) !== null) {
      setCrediantial({ name: String(name).slice(0, String(name).length - 1) });
    }
  };

  const onotpchange = (e) => {
    setOtpEtc(e.target.value);
  };

  const onchange = (e) => {
    setCrediantial({ ...crediantial, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="my-3 mainContainer">
        <div className="container my-3 df text-light p-1 flex-column rounded login-main-box">
          <div className="df container p-2 m-2 login-head">
            <h1>Sign Up</h1>
          </div>
          <div className="df flex-wrap-reverse justify-content-evenly login-process">
            <div className="df flex-column m-3 p-2 rounded login-part">
              <div className="text-light login-form">
                <form ref={form}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Enter Name
                    </label>
                    <input
                      type="text"
                      hidden
                      readOnly
                      name="otp"
                      id="otp"
                      value=""
                    />
                    <input
                      type="text"
                      className="form-control"
                      onKeyUp={checkName}
                      id="name"
                      required
                      value={name}
                      name="name"
                      placeholder="Enter your Name"
                      onChange={onchange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
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
                        value={username}
                        name="username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={onchange}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Enter Email
                    </label>
                    <div className="input-group mb-3">
                      <input
                        type="email"
                        className="form-control"
                        required
                        value={email}
                        placeholder="Email Id"
                        aria-describedby="basic-addon2"
                        name="email"
                        onChange={onchange}
                      />
                      <span className="input-group-text" id="basic-addon2">
                        @example.com
                      </span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      required
                      name="password"
                      value={password}
                      className="form-control"
                      aria-describedby="passwordHelpBlock"
                      onChange={onchange}
                    />
                  </div>
                  <div className="mb-3">
                    <div className="df justify-content-between">
                      <Link to={"/login"} className="btn btn-primary btnMe">
                        Login
                      </Link>
                      <button
                        id="inputaking"
                        type="buttom"
                        className="btn btn-primary btnMe"
                        onClick={inputTaking}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#otpVerify"
                  ref={ref}
                ></button>
                <div
                  className="modal fade"
                  id="otpVerify"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content bg-secondary bg-opacity-50 rounded">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          OTP Verification
                        </h1>
                        {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                      </div>
                      <div className="modal-body">
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">
                            Enter OTP(One Time Password)
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            maxLength={7}
                            id="otpv"
                            required
                            value={otpEtc}
                            name="otpv"
                            placeholder="Enter OTP (One Time Password)"
                            onChange={onotpchange}
                          />
                        </div>
                      </div>
                      <div className="modal-footer">
                        {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                        <button
                          id="register_btn"
                          type="button"
                          className="btn btn-primary"
                          onClick={register}
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="df flex-column p-2 rounded login-content-part">
              <div className="m-3 login-content-head signup-content-head">
                <h1>Welcome to blogWorld</h1>
                <p className="text">
                  Sign Up with Complete Authentication Process.
                </p>
              </div>
              <div className="login-main-content signup-main-content">
                <p className="px-3 m-3 txt">
                  This site are provide you opportunity to show your blogs in
                  everyone, create your own blogs and show this blogs through
                  this site, no go other place for showing your blogs. Your
                  blogs have comments and like through other this motivate you
                  for create more blogs and show your feelings , talent,
                  opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
