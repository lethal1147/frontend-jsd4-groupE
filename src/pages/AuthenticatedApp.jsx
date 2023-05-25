import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import CreateCard from "./CreateCard";
import Dashboard from "./DashBoard";
import EditCard from "./EditCard";
import ReadCard from "./ReadCard";
import Profile from "./Profilepage";
function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/createcard" element={<CreateCard />} />
        <Route path="/updatecard/:id" element={<EditCard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/readcard" element={<ReadCard />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;