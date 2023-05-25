import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/dashboardCSS/BlankCard.css';

function BlankCard() {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleCardClick = () => {
        navigate('/createcard');
    };

    const cardClassName = `blankCard ${isHovered ? 'hovered' : ''}`;

    return (
        <div
            className={cardClassName}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleCardClick}
        >
            <div className="plusCharacter">+</div>
            <div className="blankCard-color"></div>
        </div>
    );
}

export default BlankCard;