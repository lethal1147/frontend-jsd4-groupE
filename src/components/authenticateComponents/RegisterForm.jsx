import React from "react";
import "../../assets/styles/authenticateCSS/RegisterForm.css";
import BarLoader from "react-spinners/BarLoader";

const RegisterForm = ({
  srcImg,
  handleChange,
  handleFileChange,
  formValues,
  formErrors,
  saveInput,
  error,
  isProcessing,
}) => {
  return (
    <form onSubmit={saveInput} className="form">
      <h1 className="register-title">Register</h1>

      {/* Profile Picture */}
      <div className="wrap">
        <input
          onChange={handleFileChange}
          name="picture"
          id="uploadInput"
          type="file"
          accept="image/*"
        />
        <label htmlFor="uploadInput">
          <img
            id="profilePhoto"
            src={srcImg}
            className={srcImg ? "uploaded-picture" : ""}
          />
        </label>
        <div className="plus-symbol">+</div>
      </div>

      <div className="allInform">
        {/* First Name */}
        <div className="register-field-container">
          <label className="labelInput">First Name*</label>
          <input
            onChange={handleChange}
            name="firstName"
            value={formValues.firstName}
            type="text"
            placeholder="First Name"
          />
          <span className="texterr"> {formErrors.firstName}</span>
        </div>

        {/* Last Name */}
        <div className="register-field-container">
          <label className="labelInput">Last Name*</label>
          <input
            onChange={handleChange}
            name="lastName"
            value={formValues.lastName}
            type="text"
            placeholder="Last Name"
          />
          <span className="texterr"> {formErrors.lastName}</span>
        </div>

        {/* Date of Birth */}
        <div className="register-field-container">
          <label className="labelInput">Date of Birth*</label>
          <input
            onChange={handleChange}
            value={formValues.birthDate}
            name="birthDate"
            type="date"
            placeholder="Date of Birth"
            max={new Date(
              new Date().getFullYear() - 7,
              new Date().getMonth(),
              new Date().getDate()
            )
              .toISOString()
              .slice(0, 10)}
          />
          <span className="texterr"> {formErrors.birthDate}</span>
        </div>

        {/* Weight */}
        <div className="register-field-container">
          <label className="labelInput">Weight*</label>
          <input
            onChange={handleChange}
            value={formValues.weight}
            name="weight"
            type="text"
            placeholder="Weight (in kg.)"
          />
          <span className="texterr"> {formErrors.weight}</span>
        </div>

        {/* Height */}
        <div className="register-field-container">
          <label className="labelInput">Height* </label>
          <input
            onChange={handleChange}
            value={formValues.height}
            name="height"
            type="text"
            placeholder="Height (in cm.)"
          />
          <span className="texterr"> {formErrors.height}</span>
        </div>

        {/* Email */}
        <div className="register-field-container">
          <label className="labelInput">Email*</label>
          <input
            onChange={handleChange}
            value={formValues.email}
            name="email"
            type="text"
            placeholder="Email"
          />
          <span className="texterr"> {formErrors.email}</span>
        </div>

        {/* Password */}
        <div className="register-field-container">
          <label className="labelInput">Password*</label>
          <input
            onChange={handleChange}
            value={formValues.password}
            name="password"
            type="password"
            placeholder="Password"
          />
          <span className="texterr"> {formErrors.password}</span>
        </div>

        {/* Confirm Password */}
        <div className="register-field-container">
          <label className="labelInput">Confirm Password*</label>
          <input
            onChange={handleChange}
            value={formValues.confirmpassword}
            name="confirmpassword"
            type="password"
            placeholder="Confirm Password"
          />
          <span className="texterr"> {formErrors.confirmpassword}</span>
        </div>
      </div>

      {/* Gender */}
      <div className="radio">
        <input
          onChange={handleChange}
          value="male"
          name="gender"
          id="1"
          type="radio"
          checked={formValues.gender === "male"}
          className="selctor"
        />
        <label>Male</label>
        <input
          onChange={handleChange}
          type="radio"
          name="gender"
          id="2"
          value="female"
          checked={formValues.gender === "female"}
          className="selctor"
        />
        <label>Female</label>
      </div>
      <span className="texterr"> {formErrors.gender}</span>

      {/* Submit Button */}
      <button type="submit" className="register-button" disabled={isProcessing}>
        <span>{isProcessing ? "Registering ... " : "Register"}</span>
      </button>
      {isProcessing ? (
        <div className="loading-icon">
          <BarLoader
            color="#FF7B54"
            size={500}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : null}
      {error && <div className="error-message">*{error}*</div>}
    </form>
  );
};

export default RegisterForm;
