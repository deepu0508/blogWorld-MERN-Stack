import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'

export default function Navbar(props) {
  // Animations
  const container = useRef();
  gsap.registerPlugin(useGSAP);
  const { contextSafe } = useGSAP({ scope: container });
  

  useGSAP(() => {
    gsap.from(".nav-link , .navbar-brand", {
      y: -200,
      opacity: 0,
      scale: 0,
      duration: 1,
      stagger: 0.2
    })
  }, { scope: container })

  // This is global props which is decide user login or logout
  const { logged, setLogged, showAlert } = props;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  // This is check session Storage auth token is valid or not
  useEffect(() => {
    if (sessionStorage.getItem("authtoken")) {
      // IIFE -> Imediately Invoke Function Express
      (async () => {
        const response = await fetch("http://localhost:8900/api/auth/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": sessionStorage.getItem("authtoken")
          }
        });
        const data = await response.json();
        data.success ? setLogged(true) : navigate("/");
        setUsername(data.user.username);
      })()
    } else {
      navigate("/")
    }
  }, []);

  const toggleTitle = () => {
    let toggleId = document.getElementById("navbarSupportedContent");
    toggleId.classList.contains("show") ? toggleId.classList.remove("show") : toggleId.classList.add("show");
  }

  const dropdown = contextSafe(() => {
    let tl = gsap.timeline();
    tl.from(".dropdown-menu", {
      y: -400,
      opacity: 0,
       duration: 0.8
    })
    tl.from(".dropdown-item",{
      y:-100,
      opacity:0,
      scale:0,
      duration:0.7,
      stagger:0.3
    })
  })

  const logout = () => {
    sessionStorage.removeItem("authtoken");
    setLogged(false);
    showAlert('success', "You are Logout")
    navigate("/");
    setUsername("");
  }
  return (
    <>
      <div className="navContainer" ref={container}>
        <nav className="navbar navbar-expand-lg  bg-dark navbar-dark border-bottom border-info rounded myNavbar">
          <div className="container-fluid">
            <Link to={'/'} className='navbar-brand' onClick={toggleTitle}>blogWorld</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item" style={{ display: logged ? "inline-block" : "none" }} onClick={toggleTitle}>
                  <Link className='nav-link' to={'/profile'}>Profile</Link>
                </li>
                <li className="nav-item" onClick={toggleTitle}>
                  <Link to={'/blogs'} className='nav-link'>Blogs</Link>
                </li>
                <li className="nav-item" style={{ display: logged ? "inline-block" : "none" }} onClick={toggleTitle}>
                  <Link className='nav-link' to={'/createblog'}>Create Blog</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to={'/contact'} onClick={toggleTitle}>Contact</Link>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id='dropdown-menu' onClick={dropdown} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Others
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to={'/about'} className='dropdown-item' onClick={toggleTitle}>About Us</Link>
                    </li>
                    <li>
                      <Link to={'/services'} className='dropdown-item' onClick={toggleTitle}>Our Service</Link>
                    </li>
                    <li>
                      <Link to={'/updates'} className='dropdown-item' onClick={toggleTitle}>Latest Updates</Link>
                    </li>
                    <li>
                      <Link to={'/pp'} className='dropdown-item' onClick={toggleTitle}>Privacy & Policy</Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="navbar-nav nav justify-content-end">
                {logged && <li className="nav-item">
                  <Link to={'/profile'} className='nav-link' onClick={toggleTitle}>{username}</Link>
                </li>}
              </ul>
              {logged ?
                <button className='btn btn-primary' type='button' onClick={() => { logout(); toggleTitle(); }}>Logout</button> : ""}
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
