/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from "../components/Layout"
import "../assets/styles/HomePage.css"

// import image
// for hero-section
import homeImageStrong from "/hero/hero-img.png";
import homeImageUnder from "/hero/hero-img-pom.png";
import homeImageOver from "/hero/hero-big.png";
// for features-section
import activity from "/home/home-tracker.jpg";
import rank from "/home/home-rank.jpg";
import challenge from "/home/home-challengeFriendSmall.jpg";
import achievement from "/home/home-achievement.jpg";
import statistic from "/home/home-statistic.jpg";
import leaderboard from "/home/home-leaderboard.jpg";
// for how-it-work-section
import startImage from "/home/home-register.png";
import workoutImage from "/home/home-workout.png";
import connectImage from "/home/home-ranking.png";
// for meet-team-section
import som from '/home/home-ceo.jpg'
import yhumyhum from '/home/home-frontend.jpg'
import teng from '/home/home-backend.jpg'
import mena from '/home/home-scrum.jpg'
import tung from '/home/home-product.jpg'
import mafia from '/home/home-uxui.jpg'

// Import swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";
// import "swiper/css/lazy"
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Scrollbar, Autoplay } from "swiper";

export default function HomePage() {
  const [bmiInput, setBmiInput] = useState({
    height: "",
    weight: "",
    bmi: "Your BMI!",
    shape: "strong",
  });

  function handlerBmiInput(e) {
    const { name, value } = e.target;
    setBmiInput({ ...bmiInput, [name]: value });
  }

  function calcBmi(e) {
    e.preventDefault();
    let height = parseFloat(bmiInput.height);
    let weight = parseFloat(bmiInput.weight);

    if (isNaN(height)) {
      const bmiResult = 'Wrong height input!'
      return setBmiInput({...bmiInput, bmi: bmiResult, shape: 'strong'})
    }
    if (isNaN(weight)) {
      const bmiResult = 'Wrong Weight input!'
      return setBmiInput({...bmiInput, bmi: bmiResult, shape: 'strong'})
    }

    const bmiResult = `Your BMI is : ${(weight / (height / 100) ** 2).toFixed(2)}`;
    const bmiState =
      bmiResult < 18.5
        ? "under"
        : bmiResult >= 18.5 && bmiResult < 25
          ? "strong"
          : bmiResult >= 25 
          ? "over"
          : "strong"
  
    setBmiInput({ ...bmiInput, bmi: bmiResult, shape: bmiState });
  }

  return (
    <Layout>
      <HomeHero bmiInput={bmiInput} />
      <HomeFeatures />
      <Homebmi
        onClick={calcBmi}
        onChange={handlerBmiInput}
        bmiInput={bmiInput}
      />
      <Homehow />
      <HomeMeetTeam />
    </Layout>
  );
}

export function HomeHero({ bmiInput }) {
  return (
    <section className="hero-section">
      <div className="hero-text-container">
        <h1>Make you exercise FUN!</h1>
        <p>
          Are you tired of boring workout routines? Do you want to add some
          excitement to your fitness journey? Look no further than our activity
          tracker app! We believe that exercise should be enjoyable and
          something you look forward to every day. With our app, you can track
          your progress, challenge your friends, and earn achievements all while
          having fun and staying motivated.
        </p>
        <button className="hero-btn">
          <Link to="/dashboard">Get Started!</Link>
        </button>
      </div>
      <div className="hero-image-container">
        {bmiInput.shape === "strong" && (
          <img src={homeImageStrong} alt="strong orange-cat" />
        )}
        {bmiInput.shape === "under" && (
          <img src={homeImageUnder} alt="strong orange-cat" />
        )}
        {bmiInput.shape === "over" && (
          <img src={homeImageOver} alt="strong orange-cat" />
        )}
      </div>
    </section>
  );
}

export function HomeFeatures() {
  return (
    <section id="features" className="feature-section">
      <h2 className="home-section-header">Features!</h2>
      <div className="feature-card-container">
        {featuresContent.map((content, i) => {
          return (
            <div key={content.title + i} className="feature-card">
              <img
                className="home-feature-card-image"
                src={content.img}
                alt={content.title}
              />
              <h3 className="home-card-header">{content.title}</h3>
              <p>{content.info}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function Homebmi({ bmiInput, onChange, onClick }) {
  return (
    <section id="bmi" className="bmi-section">
      <div className="bmi-form-container">
        <form className="bmi-form">
          <h3>BMI Calculator</h3>
          <input
            placeholder="Your Height (in cm.)"
            onChange={onChange}
            name="height"
            value={bmiInput.height}
          />
          <input
            placeholder="Your Weight (in kg.)"
            onChange={onChange}
            name="weight"
            value={bmiInput.weight}
          />
          <span>{bmiInput.bmi}</span>
          <button onClick={onClick}>Calculate</button>
        </form>
      </div>
      <div className="bmi-image-container">
        {bmiInput.shape === "strong" && (
          <img src={homeImageStrong} alt="strong orange-cat" />
        )}
        {bmiInput.shape === "under" && (
          <img src={homeImageUnder} alt="strong orange-cat" />
        )}
        {bmiInput.shape === "over" && (
          <img src={homeImageOver} alt="strong orange-cat" />
        )}
      </div>
    </section>
  );
}

export function Homehow() {
  return (
    <section id="how" className="how-section">
      <h2 className="home-section-header">How it Work!</h2>
      <div className="how-card-container">
        {howSectionContent.map((content) => {
          return (
            <div className="how-card" key={content.title}>
              <h3 className="home-card-header">{content.title}</h3>
              <img
                className="home-how-card-image"
                alt={content.alt}
                src={content.imageUrl}
              />
              <p>{content.info}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function HomeMeetTeam() {
  return (
    <section>
      <h2 className='home-section-header'>Meet our Team!</h2>
      <div className='home-meet-card-container'>
        <Swiper
          navigation={true}
          modules={[Navigation, Scrollbar, Autoplay]}
          scrollbar={{
            hide: true
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
        >
          {meetTeamSectionContent.map((employee) => {
            return (
              <SwiperSlide key={employee.id}>
                <div className='home-meet-card'>
                  <div className='home-meet-img-container'>
                    <img className='home-meet-img' src={employee.img} alt='An orange cat wear suit.' />
                  </div>
                  <div className='home-meet-card-text'>
                    <h3>{employee.name}</h3>
                    <span className='home-meet-position'>{employee.position}</span>
                    <h5>({employee.author})</h5>
                  </div>
                </div>
              </SwiperSlide>
            )
          })
          }
        </Swiper>
      </div>
    </section>
  )
}

// Content to map for feature section
const featuresContent = [
  {
    img: activity,
    title: "Activity Tracking",
    info: "Easily track your workouts with our user-friendly interface. Set goals and monitor your progress towards them.",
  },
  {
    img: rank,
    title: "Rank System",
    info: "Climb the ranks by completing workouts and earn badges and rewards along the way. See where you stand on our leaderboard.",
  },
  {
    img: challenge,
    title: "Challenge Friends",
    info: "Invite your friends to workout challenges and see who can achieve their goals first. Stay motivated and accountable with friendly competition.",
  },
  {
    img: achievement,
    title: "Achievements",
    info: " Earn achievements by completing challenges and hitting milestones. Celebrate your progress and stay motivated to reach new heights.",
  },
  {
    img: statistic,
    title: "Statistic",
    info: "View detailed charts and graphs of your progress over time. Identify areas for improvement and track your growth.",
  },
  {
    img: leaderboard,
    title: "Leaderboard",
    info: "See where you stand compared to other users on our leaderboard. Climb the ranks and compete for the top spot.",
  },
];
// Content to map for how-it-word section
const howSectionContent = [
  {
    title: '01 Get start!',
    alt: 'A pen',
    imageUrl: startImage,
    info: 'Sign up and set your fitness goals!'
  },
  {
    title: '02 Workout!',
    alt: 'Workout image',
    imageUrl: workoutImage,
    info: 'Track your activities and view your progress statistics!'
  },
  {
    title: '03 Connect!',
    alt: 'Statistic',
    imageUrl: connectImage,
    info: 'Connect with friends, climb the leaderboard to stay motivated!'
  }
]
// Content to map for meet teem section
const meetTeamSectionContent = [
  {
    id: 1,
    img: som,
    name: 'Som',
    position: 'CEO',
    author: 'Praew, Haluethaichanok'
  },
  {
    id: 2,
    img: tung,
    name: 'Tungthong',
    position: 'Product Manager',
    author: 'Arm, Siwat'
  },
  {
    id: 3,
    img: mena,
    name: 'Mena',
    position: 'Scrum Master',
    author: 'Kitti, Kittipol'
  },
  {
    id: 4,
    img: yhumyhum,
    name: 'Yhumyhum',
    position: 'Frontend Developer',
    author: 'Kim, Joakim'
  },
  {
    id: 5,
    img: teng,
    name: 'Teng',
    position: 'Backend Developer',
    author: 'Seed, Peeranat'
  },
  {
    id: 6,
    img: mafia,
    name: 'Mafia',
    position: 'UX/UI Designer',
    author: 'Folk, Nonlaphan'
  }
]
