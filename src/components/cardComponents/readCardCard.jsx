import React, { useState } from "react";
import "../../assets/styles/cardCSS/readCardCard.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import biking from "/exercises/biking.png";
import running from "/exercises/running.png";
import swimming from "/exercises/swimming.png";
import cardio from "/exercises/cardio.png";
import walking from "/exercises/walking.png";

function Card({ data, fetchActivity }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleDelete = async () => {
    const backend = import.meta.env.VITE_BACKEND_URL;
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this activity card!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await axios.delete(
            `${backend}/activities/${data._id}`
          );
          swal("Your activity card has been deleted!", {
            icon: "success",
          });
          fetchActivity();
        } catch (err) {
          console.error(err);
        }
      } else {
        swal("Your account is safe!");
      }
    });
  };

  const backgroundColor =
    data.task === "complete"
      ? "#96d674"
      : data.task === "inProgress"
      ? "#fff476"
      : data.task === "fail"
      ? "#fd8888"
      : "";

  const cardClassName = `r-prevcard ${isHovered ? "hovered" : ""}`;

  return (
    <div
      className={cardClassName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="r-prevImg">
        <img src={data.img} className="r-img" />
      </div>
      <div className="r-container-text">
        <div className="r-prevTextbox">
          <p className="r-title-text">{data.title}</p>
        </div>

        <a href={`/updatecard/${data._id}`}>
          <FontAwesomeIcon icon={faPenToSquare} className="r-faPenToSquare" />
        </a>

        <FontAwesomeIcon
          icon={faTrashCan}
          className="r-faTrashCan"
          onClick={handleDelete}
        />
        <div className="r-prevCaption">
          <p className="r-caption-text">{data.caption}</p>
        </div>
        <div className="r-prevDate">
          <p className="r-date-text">{data.date}</p>
        </div>
        <FontAwesomeIcon icon={faCalendar} className="r-faCalendar" />
        <div className="r-prevDuration">
          {data.type === "biking" && (
            <img src={biking} className="r-icon-img" />
          )}
          {data.type === "running" && (
            <img src={running} className="r-icon-img" id="r-i-run" />
          )}
          {data.type === "swimming" && (
            <img src={swimming} className="r-icon-img-swimming" />
          )}
          {data.type === "cardio" && (
            <img src={cardio} className="r-icon-img" />
          )}
          {data.type === "walking" && (
            <img src={walking} className="r-icon-img" />
          )}
          <p className="r-duration-text">{data.duration}</p>
        </div>
      </div>
      <div className="r-previewStatus" style={{ backgroundColor }}></div>
    </div>
  );
}

export default Card;
