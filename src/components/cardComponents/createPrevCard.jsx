import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Uploader from "./createUploader";
import "../../assets/styles/cardCSS/createPrevCard.css";

import biking from "/exercises/biking.png";
import running from "/exercises/running.png";
import swimming from "/exercises/swimming.png";
import cardio from "/exercises/cardio.png";
import walking from "/exercises/walking.png";

const exerciseIcons = {
  biking,
  running,
  swimming,
  cardio,
  walking,
};

function PrevCard({ inputs, task, image, handleFileChange }) {
  const { type, title, caption, date, duration } = inputs;

  return (
    <div className="prevcard">

      {/* preview Image */}
      <div className="prevImg">
        <Uploader image={image} handleFileChange={handleFileChange} />
      </div>

      {/* preview title */}
      <div className="container-text">
        <div className="prevTextbox">
          <p className="title-text">{title}</p>
        </div>

        {/* edit and delete icon */}
        <FontAwesomeIcon icon={faPenToSquare} className="faPenToSquare" />
        <FontAwesomeIcon icon={faTrashCan} className="faTrashCan" />

        {/* preview caption */}
        <div className="prevCaption">
          <p className="caption-text">{caption}</p>
        </div>

        {/* preview date */}
        <div className="prevDate">
          <p className="date-text">{date}</p>
        </div>

        {/* date icon */}
        <FontAwesomeIcon icon={faCalendar} className="faCalendar" />

        {/* preview duration */}
        <div className="prevDuration">
          {type && <img src={exerciseIcons[type]} className="icon-img" />}
          <p className="duration-text">{duration}</p>
        </div>
      </div>

      <div className="prevDuration" id="responsive-duration-text">
        {type && <img src={exerciseIcons[type]} className="icon-img" />}
        <p className="duration-text">{duration}</p>
      </div>

      {/* preview task status */}
      <div className="previewStatus" style={{ backgroundColor: task }}></div>
    </div>
  );
}

export default PrevCard;