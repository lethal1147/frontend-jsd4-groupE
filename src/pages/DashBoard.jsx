import { useEffect } from "react";
import DashboardBox from "../components/dashboardComponents/dashboardBox";
import Layout from "../components/Layout";

export default function Dashboard() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <DashboardBox className="dashboard-box" />
    </Layout>
  );
}
