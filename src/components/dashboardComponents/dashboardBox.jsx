import React, { useEffect } from 'react';
import '../../assets/styles/dashboardCSS/dashboardBox.css';

import DashboardProfile from './dashboardProfile';
import DashboardProgress from './dashboardProgress';
import DashboardAchievements from './dashboardAchievements';
import DashboardCards from './dashboardCard';

export default function DashboardBox() {

    useEffect(() => {
        const currentURL = window.location.pathname;

        if (currentURL === '/dashboard') {
            document.body.classList.add('dashboard-page');
        }

        return () => {
            document.body.classList.remove('dashboard-page');
        };
    }, []);

    return (
        <div className="dashboard-container">
            <div className="dashboard-column" id="column-1">
                <div className="dashboard-card" id="dashboard-card-responsive-big">
                    <DashboardProfile />
                </div>
                <div className="dashboard-card" id="dashboard-card-responsive-big">
                    <DashboardProgress />
                </div>
            </div>
            <div className="dashboard-column" id="column-2">
                <div className="dashboard-card" id="dashboard-card-responsive-small">
                    <DashboardProfile />
                </div>
                <div className="dashboard-card" id="dashboard-card-responsive-small">
                    <DashboardProgress />
                </div>
                <div className="dashboard-card">
                    <DashboardAchievements />
                </div>
                <div className="dashboard-card">
                    <DashboardCards />
                </div>
            </div>
        </div>
    )
}