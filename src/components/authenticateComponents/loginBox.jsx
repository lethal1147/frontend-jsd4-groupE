import { useState } from "react";
import { useAuth } from "../../contexts/authentication";
import { Link } from "react-router-dom";
import "../../assets/styles/authenticateCSS/loginBox.css";

export default function LoginBox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, state } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ email, password });
  };

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-fields">
        <h1 className="login-title">Login</h1>
        <div className="username-container">
          <p>Email</p>
          <input
            className="username-input-container"
            type="text"
            placeholder="Email"
            onChange={(event) => handleInputChange(event, setEmail)}
            value={email}
          />
        </div>

        <div className="password-container">
          <p>Password</p>
          <div>
            <input
              className="password-input-container"
              type="password"
              placeholder="Password"
              onChange={(event) => handleInputChange(event, setPassword)}
              value={password}
            />
            {state.error && <p className="error-message">{state.error}</p>}
          </div>
        </div>
        <button className="login-button">Sign In</button>
      </form>

      <div className="login-footer">
        <p>Don't have an account yet?</p>
        <p>
          <Link to="/register">Register for free.</Link>
        </p>
      </div>
    </div>
  );
}