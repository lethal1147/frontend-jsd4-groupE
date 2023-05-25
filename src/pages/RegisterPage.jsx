import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { validate } from "../utils/validateRegister";
import RegisterForm from "../components/authenticateComponents/RegisterForm";
import Layout from "../components/Layout";
import axios from "axios";
import Cat from "/hero/hero-img.png";
import "../assets/styles/authenticateCSS/RegisterPage.css";
import swal from "sweetalert";

function FormRegister() {
  // useStates and variables
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [srcImg, setSrcImg] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState("");
  const [errorImg, setErrorImg] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    picture: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    weight: "",
    height: "",
  });

  // Function to handle change in input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  function handleFileChange(e) {
    const { files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setSrcImg(URL.createObjectURL(file));
      setFormValues((prevInputs) => ({ ...prevInputs, picture: file }));
    }
  }

  // Function to handle save inputs
  const saveInput = async (e) => {
    e.preventDefault();
    const backend = import.meta.env.VITE_BACKEND_URL;
    setErrorImg("");
    setIsSubmit(true);
    const error = validate(formValues);
    setFormErrors(error);

    if (Object.keys(error).length === 0) {
      setIsProcessing(!isProcessing);
      const { confirmpassword, ...userData } = formValues;
      const formData = new FormData();

      for (const [key, value] of Object.entries(userData)) {
        formData.append(key, value);
      }

      try {
        const response = await axios.post(
          `${backend}/auth/register`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        swal("Registered!", "Let's get started!", "success");
        navigate("/login");
      } catch (error) {
        setError(error.response.data.message);
        setIsSubmit(false);
        setIsProcessing(false);
        if (error.request.status === 500) {
          setErrorImg("Invalid file image type!");
        }
        swal("Oops", "Something went wrong!", "error");
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect(() => {
  //   setIsProcessing(false);
  // }, [error, isSubmit]);

  return (
    <Layout>
      <section className="fullpage">
        <RegisterForm
          className="left-form"
          srcImg={srcImg}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
          formValues={formValues}
          formErrors={formErrors}
          saveInput={saveInput}
          error={error}
          isProcessing={isProcessing}
          errorImg={errorImg}
        />
        <div className="register-cats">
          <img src={Cat} alt="Muscular Orange Cat" className="right" />
          {/* <img src={Cat} alt="Muscular Orange Cat" className="right" />
          <img src={Cat} alt="Muscular Orange Cat" className="right" /> */}
        </div>
      </section>
    </Layout>
  );
}

export default FormRegister;
