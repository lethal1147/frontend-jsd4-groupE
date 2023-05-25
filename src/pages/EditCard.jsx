import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { calcDuration } from "../utils/calcDuration";
import axios from "axios";

import Layout from "../components/Layout";
import EditPrevCard from "../components/cardComponents/editPrevCard";
import EditForm from "../components/cardComponents/editForm";
import SideContainer from "../components/cardComponents/sideContainer";
import "../assets/styles/cardCSS/createCard.css";
import swal from "sweetalert";

function EditCard() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log({ id });

  const [task, setTask] = useState("");
  const [image, setImage] = useState(null);
  const [durationAlert, setDurationAlert] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [inputs, setInputs] = useState({
    title: "",
    caption: "",
    timeStart: "",
    timeEnd: "",
    duration: "",
    date: "",
    task: "",
    type: "",
    img: "",
  });

  const handleCalcDuration = () => {
    setInputs(calcDuration(inputs));
  };

  let changeColor = (e) => {
    const color = ["#96d674", "#fff476", "#fd8888"];
    const { value } = e.target;
    if (value === "complete") {
      setTask(color[0]);
    }
    if (value === "inProgress") {
      setTask(color[1]);
    }
    if (value === "fail") {
      setTask(color[2]);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  function handleFileChange(e) {
    const file = e.target.files[0];
    const image = URL.createObjectURL(file);
    setImage(image);

    setInputs((prevInputs) => ({
      ...prevInputs,
      img: file,
    }));
  }

  useEffect(() => {
    fetchActivity();
  }, []);

  const fetchActivity = async () => {
    const backend = import.meta.env.VITE_BACKEND_URL;
    try {
      const res = await axios.get(`${backend}/activities/` + id);
      console.log(res.data);

      const taskColor = {
        complete: "#96d674",
        inProgress: "#fff476",
        fail: "#fd8888",
      };

      setInputs({
        ...inputs,
        title: res.data.title,
        caption: res.data.caption,
        timeStart: res.data.timeStart,
        timeEnd: res.data.timeEnd,
        duration: res.data.duration,
        date: res.data.date,
        task: res.data.task,
        type: res.data.type,
        img: res.data.img,
      });

      setTask(taskColor[res.data.task]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const backend = import.meta.env.VITE_BACKEND_URL;

    if (inputs.duration === "0 h 0 m" || inputs.duration === " 0 m") {
      setDurationAlert(true);
      return;
    }

    const formData = new FormData();
    for (const [key, value] of Object.entries(inputs)) {
      formData.append(key, value);
    }

    setIsProcessing(!isProcessing);

    try {
      const response = await axios.put(
        `${backend}/activities/updatecard/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      swal("Edited!", "Your activity card has been edited!", "success");

      navigate("/readcard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async (e) => {
    navigate("/readcard");
  };

  return (
    <Layout>
      <div className="create-card-container">
        <SideContainer />
        <div className="create-container">
          <div className="head-sentence">
            <h1 className="firsttopic">Edit Your Awesome Card</h1>
            <h2 className="secondtopic">Did You Meow Today?</h2>
            <h3 className="thirdtopic">Today's Workout</h3>
          </div>
          {/* card */}
          <EditPrevCard
            inputs={inputs}
            image={image}
            handleFileChange={handleFileChange}
            task={task}
            handleChangeInput={handleChangeInput}
          />
          {/* form */}
          <EditForm
            handleChangeInput={handleChangeInput}
            calcDuration={handleCalcDuration}
            changeColor={changeColor}
            inputs={inputs}
            handleFormSubmit={handleFormSubmit}
            durationAlert={durationAlert}
            handleCancel={handleCancel}
            isProcessing={isProcessing}
          />
        </div>
      </div>
    </Layout>
  );
}

export default EditCard;
