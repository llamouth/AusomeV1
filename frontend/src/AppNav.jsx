import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//PAGES
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import UserFeed from "./Pages/UserFeed";
import SignUpPage from "./Pages/SignUp";
import FourZeroFour from "./components/404/FourOFour";
import Profile from "./Pages/Profile";
import FriendRequest from "./Pages/FriendRequest";

function AppNav() {
  return (
    <div className="h-full flex justify-center items-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/:id/feed" element={<UserFeed />} />
        <Route path="/:id/profile" element={<Profile />} />
        <Route path="/:id/friend-requests" element={<FriendRequest />} />
        <Route path="*" element={<FourZeroFour />} />
      </Routes>
    </div>
  );
}

export default AppNav;
