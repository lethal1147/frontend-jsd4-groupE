import "../../assets/styles/dashboardCSS/dashboardProfile.css";
import defaultProfile from "/cat/head-logo.png";
import { useAuth } from "../../contexts/authentication";

export default function DashboardProfile() {
  const { currentUser } = useAuth();

  return (
    <div className="dashboard-profile">
      <div className="dashboard-profile-image">
        <img src={currentUser.picture ? currentUser.picture : defaultProfile} alt="Profile" />
      </div>
      <h3>{currentUser.firstName} {currentUser.lastName}</h3>
    </div>
  );
}