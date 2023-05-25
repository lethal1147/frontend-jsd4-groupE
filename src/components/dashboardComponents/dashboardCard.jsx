import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../cardComponents/readCardCard";
import BlankCard from "./BlankCard";
import "../../assets/styles/dashboardCSS/dashboardCard.css";

export default function DashboardCards() {
  const cardColumn = 2;
  const navigate = useNavigate();
  const [getActivity, setActivity] = useState([]);

  // Function to fetch activity data from the server
  const fetchActivity = async () => {
    const backend = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.get(`${backend}/activities`);
      const { data } = response.data;
      // Update the state variable with fetched activity data
      setActivity(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Function to handle click on an activity
  const handleActivityClick = (ele) => {
    if (Object.keys(ele).length === 0) {
      navigate("/createcard");
    }
  };

  // Fetch activity data when the component mounts
  useEffect(() => {
    fetchActivity();
  }, []);

  // Ensure exactly three activities are rendered
  // const renderActivity = getActivity.slice(0, 3).concat(Array(3 - getActivity?.length).fill({}));

  const renderActivity = getActivity.slice(0, cardColumn);

  if (getActivity?.length < cardColumn) {
    const emptyItems = Array(cardColumn - (getActivity?.length || 0)).fill({});
    renderActivity.push(...emptyItems);
  }

  return (
    <div className="cards-container">
      {renderActivity.map((ele, index) => (
        <div key={ele._id || index} onClick={() => handleActivityClick(ele)}>
          {Object.keys(ele).length === 0 ? (
            <BlankCard key={`${ele._id || index}-blank`} />
          ) : (
            <Card
              key={`${ele._id || index}-card`}
              data={ele}
              fetchActivity={fetchActivity}
            />
          )}
        </div>
      ))}
      <div className="button-container">
        <button
          className="read-card-button"
          onClick={() => navigate("/readcard")}
        >
          View More
        </button>
      </div>
    </div>
  );
}
