import '../../assets/styles/dashboardCSS/dashboardGoals.css';

export default function DashboardGoals() {

    return (
        <div>
            <h2 className="goals-text">Your Goals</h2>
            <div className="goals-container">
                {goalsMockData.map((goal, index) => (
                    <div key={index} className="goal-image">
                        <img src={goal.goalImg} alt="Profile" />
                    </div>
                ))}
            </div>
        </div>
    );
}

const goalsMockData = [
    {
        goalImg: '/cat/head-logo.png',
    },
    {
        goalImg: '/cat/head-logo.png',
    },
];