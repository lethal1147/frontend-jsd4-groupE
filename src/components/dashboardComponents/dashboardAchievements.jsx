import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/authentication';
import axios from 'axios';
import '../../assets/styles/dashboardCSS/dashboardAchievements.css';

export default function DashboardAchievements() {
    const [achievements, setAchievements] = useState(achievementsMockData);
    const [activitiesType,setActivitiesType] = useState()
    const [achievementLoading, setAchievementLoading] = useState(true)
    const {currentUser} = useAuth()

    const calcAchievementImage = useCallback((activity) => {
        if (activity >= 10) {
            return 'Gold'
        } else if (activity >= 5) {
            return 'Silver'
        } else if (activity < 5) {
            return 'Bronze'
        }
    },[activitiesType])

    useEffect(() => {
        fetchCountActivity()
        setAchievementLoading(false)
    }, []);

    let achievement
    if(activitiesType) {
        achievement = [
                {count: activitiesType.biking, achievementImg: `/medals/Biking/medalBiking${calcAchievementImage(activitiesType.biking)}.png`},
                {count: activitiesType.running, achievementImg: `/medals/Running/medalRunning${calcAchievementImage(activitiesType.running)}.png`},
                {count: activitiesType.swimming, achievementImg: `/medals/Swimming/medalSwimming${calcAchievementImage(activitiesType.swimming)}.png`},
                {count: activitiesType.cardio, achievementImg: `/medals/Cardio/medalCardio${calcAchievementImage(activitiesType.cardio)}.png`},
                {count: activitiesType.walking, achievementImg: `/medals/Walking/medalWalking${calcAchievementImage(activitiesType.walking)}.png`},
            ]
        }


    const fetchCountActivity = async() => {
        const backend = import.meta.env.VITE_BACKEND_URL;
        try {
            const response = await axios.get(`${backend}/activities/count/${currentUser._id}`)
            const data = {
                biking: response.data.biking ? response.data.biking : 0,
                running: response.data.running ? response.data.running : 0,
                swimming: response.data.swimming ? response.data.swimming : 0,
                cardio: response.data.cardio ? response.data.cardio : 0,
                walking: response.data.walking ? response.data.walking : 0,
            }
            
            setActivitiesType(data)
            // console.log(data)
            // console.log(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="achievements-container">
            <h2 className="achievements-text">Achievements</h2>
            <div className="achievements-wrapper">
                {achievementLoading && <h3>Loading...</h3>}
                {!achievementLoading && achievement?.map(({ achievementImg, count }, index) => (
                    <div key={index}>
                        <div className="achievement-image">
                            <img src={achievementImg} alt="Profile" />
                        </div>
                        <p className='achievement-count'>{count}</p>
                    </div>
                    
                ))}
            </div>
        </div>
    );
}

const achievementsMockData = [
    { achievementImg: '/medals/Biking/medalBikingBronze.png' },
    { achievementImg: '/medals/Cardio/medalCardioBronze.png' },
    { achievementImg: '/medals/Running/medalRunningBronze.png' },
    { achievementImg: '/medals/Swimming/medalSwimmingBronze.png' },
    { achievementImg: '/medals/Walking/medalWalkingBronze.png' },
];
