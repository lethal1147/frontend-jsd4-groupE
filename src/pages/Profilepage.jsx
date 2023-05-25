// Profile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { validateProfile } from "../utils/validateProfile";
import axios from "axios";
import swal from "sweetalert";
import Layout from "../components/Layout";
import ProfileForm from "../components/ProfileForm";
import "../assets/styles/ProfilePage.css";



const Profile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [srcImg, setSrcImg] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);



  const fetchData = async () => {
    const backend = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.get(`${backend}/profile`);
      setUserData(response.data.data);
      setSrcImg(response.data.data.picture);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangePic = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setSrcImg(URL.createObjectURL(file));
      setUserData((prevData) => ({ ...prevData, picture: file }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const backend = import.meta.env.VITE_BACKEND_URL;
    setIsSubmit(true);

    const error = validateProfile(userData);
    setFormErrors(error);

    if (Object.keys(error).length === 0) {
      setIsProcessing(true);
      const formData = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      try {
        const response = await axios.put(
          `${backend}/profile/update`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        const updateData = response.data.data;
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        Object.assign(currentUser, {
          firstName: updateData.firstName,
          lastName: updateData.lastName,
          email: updateData.email,
          height: updateData.height,
          weight: updateData.weight,
          picture: updateData.picture,
        });
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        swal("Updated!", "Your profile has been updated!", "success");
        navigate("/dashboard");
      } catch (err) {
        console.log(err);
        setIsProcessing(false);
        swal("Oops", "Something went wrong!", "error");
      }
    }
  };

  const handleDeleteProfile = async (e) => {
    e.preventDefault();
    const backend = import.meta.env.VITE_BACKEND_URL;
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this account!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(`${backend}/profile/delete`);
          swal("Your account has been deleted!", { icon: "success" });
          localStorage.removeItem("currentUser");
          localStorage.removeItem("token");
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      } else {
        swal("Your account is safe!");
      }
    });
  };



  useEffect(() => {
    fetchData();
  }, []);



  return (
    <Layout>
      <ProfileForm
        userData={userData}
        srcImg={srcImg}
        formErrors={formErrors}
        isProcessing={isProcessing}
        handleChangePic={handleChangePic}
        handleChange={handleChange}
        handleUpdateProfile={handleUpdateProfile}
        handleDeleteProfile={handleDeleteProfile}
      />
    </Layout>
  );
}

export default Profile;