import React, { useState } from "react";
import "../assets/styles/NavBar.css";
const NavBar = () => {
  const [navAfter, setNavAfter] = useState(false);

  /* a call function for */
  const toggle = () => {
    var toggleNav = document.getElementById("nav-menu");
    if (toggleNav.style.display === "none") {
      toggleNav.style.display = "inline";
    } else {
      toggleNav.style.display = "none";
    }
  };

  return (
    <nav>
      {/* before login navbar */}
      <div className="nav">
        <a className="site-title">
          <img id="nav-img" src="/cat/head-logo.png" />
          Orange Cat
        </a>
        <ul className="nav-middle">
          <li>
            <a href="/">Feature</a>
          </li>
          <li>
            <a href="/">BMI</a>
          </li>
          <li>
            <a href="/">How It Work</a>
          </li>
        </ul>
        <ul className="nav-right">
          <li>
            <a href="/login">Sign in</a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
        </ul>
      </div>

      {/* After login navbar */}
      <div className="navAfter" style={{ display: "none" }}>
        <a className="site-title">
          <img id="nav-img" src="/cat/head-logo.png" />
          Orange Cat
        </a>
        <ul className="nav-middle">
          <li>
            <a href="/">Feature</a>
          </li>
          <li>
            <a href="/">BMI</a>
          </li>
          <li>
            <a href="/">How It Work</a>
          </li>
        </ul>
        <div className="allNavRight">
          <div className="nav-right">
            <img id="profilepic" src="/generic/Login_logo.png" />
            <button onClick={toggle} id="nav-toggle">
              Username
            </button>
          </div>

          <div id="nav-menu" style={{ display: "none" }}>
            <ul className="nav-links">
              <li className="nav-item">
                <a href="#">Profile</a>
              </li>
              <li className="nav-item">
                <a href="#">Profile</a>
              </li>
              <li className="nav-item">
                <a href="#">Profile</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
