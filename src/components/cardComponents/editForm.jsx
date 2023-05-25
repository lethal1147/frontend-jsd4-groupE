import React, { useState, useEffect } from "react";
import BarLoader from "react-spinners/BarLoader";

import biking from "/exercises/biking.png";
import running from "/exercises/running.png";
import swimming from "/exercises/swimming.png";
import cardio from "/exercises/cardio.png";
import walking from "/exercises/walking.png";
import "../../assets/styles/cardCSS/createForm.css";
import "../../assets/styles/cardCSS/createFormResponsive.css";

function Form({
  handleChangeInput,
  calcDuration,
  changeColor,
  inputs,
  handleFormSubmit,
  durationAlert,
  handleCancel,
  isProcessing,
}) {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <form onSubmit={handleFormSubmit} className="create-card-form">
      <div className="title-date">
        {/* Add data: Title  */}
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          placeholder="type your title"
          name="title"
          id="title"
          required
          onChange={handleChangeInput}
          value={inputs.title}
        ></input>

        {/* Add data: Date */}
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          name="date"
          id="date"
          onChange={handleChangeInput}
          required
          value={inputs.date}
        ></input>
      </div>

      {/* Add data: activity */}
      <div className="activity-container">
        <p>Activity:</p>
        <div className="activity-list">
          <div className="tile">
            <input
              type="radio"
              value="biking"
              name="type"
              id="biking"
              required
              onChange={handleChangeInput}
              checked={inputs.type === "biking"}
            ></input>
            <label htmlFor="biking" className="activity-label">
              <img src={biking} alt="biking" className="activity-image" />
              <h6>Biking</h6>
            </label>
          </div>
          <div className="tile">
            <input
              type="radio"
              value="running"
              name="type"
              id="running"
              required
              onChange={handleChangeInput}
              checked={inputs.type === "running"}
            ></input>
            <label htmlFor="running" className="activity-label">
              <img src={running} alt="running" className="activity-image" />
              <h6>running</h6>
            </label>
          </div>
          <div className="tile">
            <input
              type="radio"
              value="swimming"
              name="type"
              id="swimming"
              required
              onChange={handleChangeInput}
              checked={inputs.type === "swimming"}
            ></input>
            <label htmlFor="swimming" className="activity-label">
              <img src={swimming} alt="swimming" className="activity-image" />
              <h6>swimming</h6>
            </label>
          </div>
          <div className="tile">
            <input
              type="radio"
              value="cardio"
              name="type"
              id="cardio"
              required
              onChange={handleChangeInput}
              checked={inputs.type === "cardio"}
            ></input>
            <label htmlFor="cardio" className="activity-label">
              <img src={cardio} alt="cardio" className="activity-image" />
              <h6>cardio</h6>
            </label>
          </div>
          <div className="tile">
            <input
              type="radio"
              value="walking"
              name="type"
              id="walking"
              required
              onChange={handleChangeInput}
              checked={inputs.type === "walking"}
            ></input>
            <label htmlFor="walking" className="activity-label">
              <img src={walking} alt="walking" className="activity-image" />
              <h6>walking</h6>
            </label>
          </div>
        </div>
      </div>

      {/* Add data: Duration */}
      <div className="time-duration">
        <div className="time-start-end">
          <div className="time-start">
            <label htmlFor="time_start">Time-Start:</label>
            <input
              type="time"
              className="time"
              name="timeStart"
              onChange={handleChangeInput}
              required
              value={inputs.timeStart}
            ></input>
          </div>
          <div className="time-end">
            <label htmlFor="time-end" className="time2">
              Time-End:
            </label>
            <input
              type="time"
              className="time"
              name="timeEnd"
              onChange={handleChangeInput}
              required
              value={inputs.timeEnd}
            ></input>
          </div>
        </div>
        <button type="button" onClick={calcDuration}>
          Duration
        </button>
        {durationAlert && (
          <p className="alert-duration">*check your duration</p>
        )}
      </div>

      {/* Add data: Task status */}
      <div className="taskStatus">
        <p>Task Status:</p>
        <div className="wrapper">
          <input
            type="radio"
            value="complete"
            name="task"
            id="complete"
            onClick={(e) => changeColor(e)}
            onChange={handleChangeInput}
            required
            checked={inputs.task === "complete"}
          ></input>
          <input
            type="radio"
            value="inProgress"
            name="task"
            id="inProgress"
            onClick={(e) => changeColor(e)}
            onChange={handleChangeInput}
            checked={inputs.task === "inProgress"}
          ></input>
          <input
            type="radio"
            value="fail"
            name="task"
            id="fail"
            onClick={(e) => changeColor(e)}
            onChange={handleChangeInput}
            checked={inputs.task === "fail"}
          ></input>

          <label htmlFor="complete" className="option option-1">
            <div className="dot dot-1"></div>
            <span>
              {window.innerWidth <= 768 ? "Completed" : "Mission Completed"}
            </span>
          </label>
          <label htmlFor="inProgress" className="option option-2">
            <div className="dot dot-2"></div>
            <span>{window.innerWidth <= 768 ? "Ongoing" : "In Progress"}</span>
          </label>
          <label htmlFor="fail" className="option option-3">
            <div className="dot dot-3"></div>
            <span>
              {window.innerWidth <= 768 ? "Failed" : "Mission Failed"}
            </span>
          </label>
        </div>
      </div>

      {/* Add data: Caption */}
      <textarea
        id="textbox"
        placeholder="Add caption:"
        name="caption"
        onChange={handleChangeInput}
        value={inputs.caption}
        required
      ></textarea>

      {/* submit button */}
      <div className="create-buttons">
        <button type="submit" className="btn-submit" disabled={isProcessing}>
          <span>{isProcessing ? "Processing ... " : "Submit"}</span>
          {isProcessing ? (
            <div className="loading-icon-edit">
              <BarLoader
                color="#FFFFFF"
                size={200}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : null}
        </button>
        <button value="cancel" className="btn-cancel" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default Form;
