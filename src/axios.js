import axios from "axios";

const instance = axios.create({
  baseURL: "https://leaderboard-backend-ytsu.onrender.com/api",
});

export default instance;
