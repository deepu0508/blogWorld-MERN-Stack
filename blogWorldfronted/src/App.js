import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Service from "./Components/Service";
import Contact from "./Components/Contact";
import ReadBlog from "./Components/ReadBlog";
import BackgroundBubble from "./Components/BackgroundBubble";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateBlog from "./Components/CreateBlog";
import BlogsPage from "./Components/BlogsPage";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import About from "./Components/About";
import Updates from "./Components/Updates";
import PrivacySecurity from "./Components/PrivacySecurity";
import BlogState from "./Context/Blogs/BlogState";
import {useEffect, useState } from "react";
import Alert from "./Components/Alert";
import UserProfile from "./Components/UserProfile";
import Cursor from "./Components/Cursor";

function App() {
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [logged, setLogged] = useState("");
  const host = "http://localhost:8900";

  let c = 0;
  useEffect(() => {
    try {
      c &&
        (async () => {
          const response = await fetch("https://geolocation-db.com/json/");
          const data = await response.json();
          if (data) {
            const auth_response = await fetch(`${host}/api/auth/bw_token`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                metadata: data,
              }),
            });
            const token = await auth_response.json();
            if (token.success)
              sessionStorage.setItem("bw_auth_token", token.bw_auth_token);
            // else alert("Please page refresh");
          }
        })();
      c += 1;
    } catch (error) {
      console.log(error)
    }
  }, []);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <>
      <BlogState>
        <BrowserRouter>
          <div
            className="bg-dark text-light"
            id="main"
            onScroll={() => console.log("object")}
          >
            <BackgroundBubble />
            <Navbar
              logged={logged}
              setLogged={setLogged}
              showAlert={showAlert}
            />
            <div className="mt-5">
              <Alert alert={alert} />
              <Routes>
                <Route exact={"/"} path="/" element={<Home />} />
                <Route
                  exact={"/signup"}
                  path="/signup"
                  element={
                    <SignUp
                      showAlert={showAlert}
                      logged={logged}
                      setLogged={setLogged}
                    />
                  }
                />
                <Route exact={"/about"} path="/about" element={<About />} />
                <Route
                  exact={"/login"}
                  path="/login"
                  element={
                    <Login
                      showAlert={showAlert}
                      logged={logged}
                      setLogged={setLogged}
                    />
                  }
                />
                <Route
                  exact={"/createblog"}
                  path="/createBlog"
                  element={<CreateBlog logged={logged} setLogged={setLogged} />}
                />
                <Route
                  exact={"/services"}
                  path="/services"
                  element={<Service />}
                />
                <Route
                  exact={"/contact"}
                  path="/contact"
                  element={<Contact />}
                />
                <Route
                  exact={"/showblog"}
                  path="/showblog"
                  element={<ReadBlog logged={logged} />}
                />
                <Route
                  exact={"/blogs"}
                  path="/blogs"
                  element={<BlogsPage logged={logged} />}
                />
                <Route
                  exact={"/updates"}
                  path="/updates"
                  element={<Updates logged={logged} />}
                />
                <Route exact={"/pp"} path="/pp" element={<PrivacySecurity />} />
                <Route
                  exact={"/profile"}
                  path="/profile"
                  element={<UserProfile showAlert={showAlert} />}
                />
              </Routes>
            </div>
            <Cursor />
          </div>
        </BrowserRouter>
      </BlogState>
    </>
  );
}

export default App;
