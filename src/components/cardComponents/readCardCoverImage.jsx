import React from 'react';
import '../../assets/styles/cardCSS/readCardCoverImage.css';

const CoverImage = ({ cover, handleFileChange }) => (
    <main className="cover-container">
        <input type="file" accept="image/*" id="imgs" className="cover-input-field" name="coverimage" onChange={handleFileChange} />
        <img src={cover} className="cover-img-upload" name="coverImg" />
        <div className="btn-changecover">
            <label className="click-here" htmlFor="imgs">
                Change Cover
            </label>
        </div>
    </main>
);

export default CoverImage;