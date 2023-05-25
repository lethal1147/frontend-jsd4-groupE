import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleLeft,
  faCircleRight,
} from "@fortawesome/free-regular-svg-icons";

import Layout from "../components/Layout";
import CallOut from "../components/cardComponents/readCardCallOut";
import Card from "../components/cardComponents/readCardCard";
import BlankCard from "../components/dashboardComponents/BlankCard";
import CoverImage from "../components/cardComponents/readCardCoverImage";
import SocialMedia from "../components/cardComponents/readCardSocialmedia";
import "../assets/styles/cardCSS/readCard.css";
import "../assets/styles/cardCSS/readCardResponsive.css";



function ReadCard() {
  const navigate = useNavigate();

  const [cover, setCover] = useState(null);
  const [currentEmoji, setCurrentEmoji] = useState(null);
  const [filename, setFilename] = useState("no selected file");
  const [getactivity, setGetActivity] = useState([]);
  const [limit, setLimit] = useState(4); //page limit
  const [page, setPage] = useState(1);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [quote, setQuote] = useState(null);
  const [rcInputs, setRcInputs] = useState({
    quote: "",
    emoji: "",
    cover: "",
  });
  const [totalPages, setTotalPages] = useState(1);



  const showPicker = () => {
    setPickerVisible(!pickerVisible);
  };

  const pickEmoji = async (e) => {
    const backend = import.meta.env.VITE_BACKEND_URL;
    setCurrentEmoji(e.native);
    setPickerVisible(!pickerVisible);
    setRcInputs((prevRcInputs) => ({ ...prevRcInputs, emoji: e.native }));
    const data = { quote: rcInputs.quote, emoji: e.native };
    try {
      const response = await axios.put(`${backend}/quote/update`, data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setRcInputs((prevRcInputs) => ({ ...prevRcInputs, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const backend = import.meta.env.VITE_BACKEND_URL;
    const { files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setFilename(file.name);
      setCover(URL.createObjectURL(file));
      handleChangeInput({ target: { name: "cover", value: file } });

      // update cover to database
      const data = { quote: rcInputs.quote, emoji: currentEmoji, cover: file };
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }
      try {
        const response = await axios.put(`${backend}/quote/update`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  //link to create card page
  const handleButton = () => {
    navigate("/createcard");
  };

  //Handler page change functions
  const handlerPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handlerNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const fetchQuote = async () => {
    const backend = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.get(`${backend}/quote`);
      if (response.data.data) {
        setCover(response.data.data.cover);
        setCurrentEmoji(response.data.data.emoji);
        setQuote(response.data.data.quote);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //for get method : activtiy data, use this inside useEffect
  const fetchActivity = async () => {
    const backend = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.get(`${backend}/activities`, {
        params: {
          page,
          limit,
        },
      });
      setGetActivity(response.data.data);
      //Get total of document in database and calculate total pages.
      const { totalDocs } = response.data;
      const totalPages = Math.ceil(totalDocs / limit);
      setTotalPages(totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOnBlur = async (event) => {
    const backend = import.meta.env.VITE_BACKEND_URL;
    const { cover, emoji, ...data } = rcInputs;
    data.emoji = currentEmoji;
    try {
      const response = await axios.put(`${backend}/quote/update`, data);
    } catch (err) {
      console.error(err);
    }
  };



  //for get method : activity data
  useEffect(() => {
    fetchActivity();
  }, [page, limit]);

  useEffect(() => {
    fetchQuote();
  }, []);



  return (
    <Layout>
      <main className="bg-readcard">
        <div className="r-coverimage">
          <CoverImage cover={cover} handleFileChange={handleFileChange} />
        </div>
        <div className="r-callout">
          <CallOut
            handleChangeInput={handleChangeInput}
            showPicker={showPicker}
            pickEmoji={pickEmoji}
            pickerVisible={pickerVisible}
            currentEmoji={currentEmoji}
            quote={quote}
            // handleKeyDown={handleKeyDown}
            handleOnBlur={handleOnBlur}
          />
        </div>
        <div className="r-socialmedia">
          <SocialMedia />
        </div>

        <div className="r-card">
          {getactivity.length > 0 ? (
            getactivity.map((ele) => (
              <Card key={ele._id} data={ele} fetchActivity={fetchActivity} />
            ))
          ) : (
            <BlankCard />
          )}
        </div>

        {/* submit button */}
        <input
          type="submit"
          value="Create new card"
          className="r-btn-create"
          onClick={handleButton}
        ></input>

        {/* page */}
        {totalPages > 1 && (
          <div className="r-page">
            <FontAwesomeIcon
              onClick={handlerPrevPage}
              icon={faCircleLeft}
              className="faCircle"
              style={{ color: page !== 1 ? "ff7b54" : "ababab" }}
            />
            <span>{page}</span>
            <FontAwesomeIcon
              onClick={handlerNextPage}
              icon={faCircleRight}
              className="faCircle"
              style={{ color: page !== totalPages ? "ff7b54" : "ababab" }}
            />
          </div>
        )}
      </main>
    </Layout>
  );
}

export default ReadCard;