import { useEffect } from "react";
import LoginBox from "../components/authenticateComponents/loginBox";
import Layout from "../components/Layout";
import Cat from "/hero/hero-img.png";
import "../assets/styles/authenticateCSS/login.css";

export default function Login() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="login-page">
        <LoginBox className="login-box" />
        <div className="login-image-container">
          <img className="login-image" src={Cat} alt="Muscular Orange Cat" />
        </div>
      </div>
    </Layout>
  );
}
