import '../../assets/styles/dashboardCSS/dashboardChallenge.css';

export default function DashboardChallenge() {

    return (
        <div>
            <h2 className="progress-text" id="challenge-text-title">Challenge!</h2>
            <div className="friend-profile-container">
                {friendsMockData.map((friend, index) => (
                    <div key={index} className="friend-profile">
                        <img src={friend.profileImg} alt="Friend Profile" />
                        <h3>{friend.username}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

const friendsMockData = [
    {
        profileImg: '/mockProfiles/mockProfile1.jpg',
        username: 'Jack_Pott'
    },
    {
        profileImg: '/mockProfiles/mockProfile2.jpg',
        username: 'Lee_King'
    },
    {
        profileImg: '/mockProfiles/mockProfile3.jpg',
        username: 'Tim_Burr'
    },
    {
        profileImg: '/mockProfiles/mockProfile4.jpg',
        username: 'Anna_Conda'
    },
    {
        profileImg: '/mockProfiles/mockProfile5.jpg',
        username: 'Manny_Kinn'
    },
    {
        profileImg: '/mockProfiles/mockProfile6.jpg',
        username: 'Dee_Zaster'
    },
    {
        profileImg: '/mockProfiles/mockProfile7.jpg',
        username: 'Paige_Turner'
    },
    {
        profileImg: '/mockProfiles/mockProfile8.jpg',
        username: 'Will_Wynn'
    },
    {
        profileImg: '/mockProfiles/mockProfile9.jpg',
        username: 'Robin_Banks'
    },
];