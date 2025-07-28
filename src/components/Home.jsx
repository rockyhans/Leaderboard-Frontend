import { useState, useEffect } from "react";
import axios from "../axios";
import AddUser from "./AddUser";
import UserSelector from "./UserSelector";
import Leaderboard from "./Leaderboard";
import LeaderboardInitial from "./LeaderboardInitial";

const Home = () => {
  const [view, setView] = useState("leaderboard");
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="HomePage">
      <div className="">
        {/* Buttons */}
        <div className="div1">
          <div className="flex justify-center buttons   ">
            <button
              onClick={() => setView("leaderboard")}
              className={view === "leaderboard" ? "btn-active" : "btn-default"}
            >
              Leaderboard
            </button>
            <button
              onClick={() => setView("addUser")}
              className={view === "addUser" ? "btn-active" : "btn-default"}
            >
              Add Users
            </button>
          </div>
        </div>

        {/* Content */}
        {view === "leaderboard" && <LeaderboardInitial />}
        {view === "addUser" && (
          <div className="">
            <div className="flex pageForDiv">
              <AddUser onUserAdded={fetchUsers} />
              <UserSelector users={users} onClaimed={fetchUsers} />
            </div>
            <Leaderboard users={users} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
