import navLogoImage from "/cat/navbar-logo.png";
import "../assets/styles/mainNav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authentication";

export default function MainNav() {
  //if dropdown === true, dropdown-menu will appear
  const [isDropdown, setIsDropdown] = useState(false);
  const auth = useAuth();
  const { logout, currentUser } = useAuth();
  // console.log(auth.currentUser)
  const loginContainer = (
    <div className="nav-login-container">
      <Link className="navbar-link" to="/login">
        {" "}
        Login{" "}
      </Link>
      <Link className="navbar-link" to="/register">
        Sign-up
      </Link>
    </div>
  );

  let profile;

  let dropdown;
  if (auth.isAuthenticated) {
    profile = (
      <div className="profile-container">
        <div className="profile-image">
          <img src={currentUser.picture ? currentUser.picture : navLogoImage} alt="Orange-cat's logo" />
        </div>
        <span
          onClick={() => setIsDropdown(!isDropdown)}
          className="profile-username"
        >
          <a className="navbar-link">{auth.currentUser.firstName}</a>
        </span>
      </div>
    );

    dropdown = (
      <ul onClick={() => setIsDropdown(!isDropdown)} className="dropdown-menu">
        <li>
          <div className="arrow-up"></div>
        </li>
        <li>
          <a className="navbar-link" href="/profile">
            Profile
          </a>
        </li>
        <li>
          <Link className="navbar-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        {window.location.pathname === "/" && (
          <>
            <li>
              <a className="navbar-link" href="#features">
                Features
              </a>
            </li>
            <li>
              <a className="navbar-link" href="#bmi">
                BMI
              </a>
            </li>
            <li>
              <a className="navbar-link" href="#how">
                How it Work
              </a>
            </li>
          </>
        )}

        <li>
          <a
            onClick={() => {
              logout();
            }}
            className="navbar-link"
          >
            Logout
          </a>
        </li>
      </ul>
    );
  } else {
    dropdown = (
      <ul onClick={() => setIsDropdown(!isDropdown)} className="dropdown-menu">
        <li>
          <div className="arrow-up"></div>
        </li>
        {window.location.pathname === "/" && (
          <>
            <li>
              <a className="navbar-link" href="#features">
                Features
              </a>
            </li>
            <li>
              <a className="navbar-link" href="#bmi">
                BMI
              </a>
            </li>
            <li>
              <a className="navbar-link" href="#how">
                How it Work
              </a>
            </li>
          </>
        )}
        {window.location.pathname !== "/" && (
          <li>
            <Link className="navbar-link" to="/">
              Home
            </Link>
          </li>
        )}
        <li>
          <Link className="navbar-link" to="/login">
            Login
          </Link>
        </li>
        <li>
          <Link className="navbar-link" to="/login">
            Sign-up
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <nav className="homeNav">
      <Link className="logo-link" to="/">
        <div onClick={() => window.scrollTo(0,0)} className="logo-container">
          <img src={navLogoImage} alt="Orange-cat's logo" />
          <span className="navbar-link">Orange Cat</span>
        </div>
      </Link>

      {window.location.pathname === "/" && (
        <ul className="nav">
          <li>
            <a className="navbar-link" href="#features">
              Features
            </a>
          </li>
          <li>
            <a className="navbar-link" href="#bmi">
              BMI
            </a>
          </li>
          <li>
            <a className="navbar-link" href="#how">
              How it Work
            </a>
          </li>
        </ul>
      )}

      {/* <div className="login-container">
                <a href="#">Login</a>
                <a href="#">Sign-up</a>
            </div> */}
      {auth.isAuthenticated ? profile : loginContainer}

      <span className="dropdown-btn">
        {/* toggle dropdown-menu */}
        <FontAwesomeIcon onClick={() => setIsDropdown(!isDropdown)} icon={faBars} size="xl"/>
      </span>

      {isDropdown && dropdown}
    </nav>
  );
}
