import React, { useState, useEffect } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import "../../assets/styles/cardCSS/readCardCallout.css";

const CallOut = ({
  handleChangeInput,
  showPicker,
  pickEmoji,
  pickerVisible,
  currentEmoji,
  quote,
  handleOnBlur,
}) => {



  const [placeholder, setPlaceholder] = useState(
    "Got a purr-fectly inspiring quote that really motivates you? Feel free to share it with us here!"
  );



  useEffect(() => {
    const updatePlaceholder = (mq) => {
      if (mq.matches) {
        setPlaceholder("Got a purr-fectly inspiring quote?");
      } else {
        setPlaceholder(
          "Got a purr-fectly inspiring quote that really motivates you? Feel free to share it with us here!"
        );
      }
    };

    const mediaQuery = window.matchMedia("(max-width: 1200px)");

    updatePlaceholder(mediaQuery);
    mediaQuery.addEventListener("change", updatePlaceholder);

    return () => {
      mediaQuery.removeEventListener("change", updatePlaceholder);
    };
  }, []);



  return (
    <main className="emojiContainer">
      <div className="emoji-allcontainer">
        <div className="emoji-subcontainer">
          <h3 className="displayEmoji">{currentEmoji}</h3>
          <textarea
            className="textarea"
            name="quote"
            onChange={handleChangeInput}
            onBlur={handleOnBlur}
            placeholder={placeholder}
            defaultValue={quote}
          />
          <FontAwesomeIcon
            icon={faFaceSmile}
            className="fa-facesmile"
            onClick={showPicker}
          />
        </div>
        <div
          style={{ display: pickerVisible ? "block" : "none" }}
          className="emoji-picker"
        >
          {pickerVisible && (
            <Picker data={data} previewPosition="none" onEmojiSelect={pickEmoji} />
          )}
        </div>
      </div>
      <div className="callout-line"></div>
    </main>
  );
};

export default CallOut;