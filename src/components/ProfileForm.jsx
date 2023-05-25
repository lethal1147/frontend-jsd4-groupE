// ProfileForm.jsx
import React from "react";
import BarLoader from "react-spinners/BarLoader";

const ProfileForm = ({
    userData,
    srcImg,
    formErrors,
    isProcessing,
    handleChangePic,
    handleChange,
    handleUpdateProfile,
    handleDeleteProfile,
}) => {
    return (
        <form className="editform">

            <a href="/dashboard" className="cross">
                <img src="/generic/cross.png" className="crossPic" />
            </a>

            <h1 className="profileNameHeader">Profile</h1>

            <div className="boxforflex">

                <div className="setprofile">
                    <div className="wrap" id="profile-photo-setting">
                        <input
                            onChange={handleChangePic}
                            name="picture"
                            id="uploadInput"
                            type="file"
                            accept="image/*"
                        />
                        <label htmlFor="uploadInput">
                            <img
                                id="profilePhoto"
                                src={srcImg}
                                className={srcImg ? "uploaded-picture" : ""}
                            />
                        </label>
                        <div className="plus-symbol">+</div>
                    </div>

                    <div className="allBtnProfile">
                        <button
                            onClick={handleUpdateProfile}
                            className="btnProfile"
                            disabled={isProcessing}
                        >
                            <span>{isProcessing ? "Updating ... " : "Update Account"}</span>
                            {isProcessing ? (
                                <div className="loading-icon-edit">
                                    <BarLoader
                                        color="#808080"
                                        size={200}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                </div>
                            ) : null}
                        </button>
                        <button
                            onClick={handleDeleteProfile}
                            className="btnProfile-delete"
                        >
                            Delete Account
                        </button>
                    </div>
                </div>

                <div className="boxRightForForm">

                    {/* First Name */}
                    <div className="profile-field">
                        <label className="labelInputEdit">First Name* :</label>
                        <input
                            type="text"
                            id="firstname"
                            value={userData.firstName}
                            onChange={handleChange}
                            name="firstName"
                            className="inputProfile"
                        />
                        <span className="texterr"> {formErrors.firstName}</span>
                    </div>

                    {/* Last Name */}
                    <div className="profile-field">
                        <label className="labelInputEdit">Last Name* :</label>
                        <input
                            onChange={handleChange}
                            name="lastName"
                            value={userData.lastName}
                            type="text"
                            className="inputProfile"
                        />
                        <span className="texterr"> {formErrors.lastName}</span>
                    </div>

                    {/* Date of Birth */}
                    <div className="profile-field">
                        <label className="labelInputEdit">Date Of Birth* :</label>
                        <input
                            onChange={handleChange}
                            value={userData.birthDate}
                            name="birthDate"
                            type="date"
                            className="inputProfile"
                        />
                        <span className="texterr"> {formErrors.birthDate}</span>
                    </div>

                    {/* Weight */}
                    <div className="profile-field">
                        <label className="labelInputEdit">Weight* :</label>
                        <input
                            onChange={handleChange}
                            value={userData.weight}
                            name="weight"
                            type="number"
                            className="inputProfile"
                            placeholder=" kg"
                        />
                        <span className="texterr"> {formErrors.weight}</span>
                    </div>

                    {/* Height */}
                    <div className="profile-field">
                        <label className="labelInputEdit">Height* : </label>
                        <input
                            onChange={handleChange}
                            value={userData.height}
                            name="height"
                            type="number"
                            className="inputProfile"
                            placeholder=" cm"
                        />
                        <span className="texterr"> {formErrors.height}</span>
                    </div>

                    {/* Email */}
                    <div className="profile-field">
                        <label className="labelInputEdit">Email* :</label>
                        <input
                            onChange={handleChange}
                            value={userData.email}
                            name="email"
                            type="email"
                            className="inputProfile"
                        />
                        <span className="texterr"> {formErrors.email}</span>
                    </div>

                    {/* Gender */}
                    <div className="radio" id="genderForProfile">
                        <input
                            onChange={handleChange}
                            value="male"
                            name="gender"
                            id="1"
                            type="radio"
                            checked={userData.gender === "male"}
                            className="selctorGender"
                        />
                        <label>Male</label>
                        <input
                            onChange={handleChange}
                            type="radio"
                            name="gender"
                            id="2"
                            value="female"
                            checked={userData.gender === "female"}
                            className="selctorGender"
                        />
                        <label>Female</label>
                        <span className="texterr"> {formErrors.gender}</span>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ProfileForm;