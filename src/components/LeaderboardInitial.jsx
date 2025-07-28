// import { useEffect, useState } from "react";
// import axios from "axios";

// const medalEmojis = ["🥇", "🥈", "🥉"];
// const avatarList = [
//   "https://i.pravatar.cc/100?img=1",
//   "https://i.pravatar.cc/100?img=2",
//   "https://i.pravatar.cc/100?img=3",
//   "https://i.pravatar.cc/100?img=4",
//   "https://i.pravatar.cc/100?img=5",
//   "https://i.pravatar.cc/100?img=6",
//   "https://i.pravatar.cc/100?img=7",
//   "https://i.pravatar.cc/100?img=8",
//   "https://i.pravatar.cc/100?img=9",
//   "https://i.pravatar.cc/100?img=10",
// ];

// const LeaderboardInitial = () => {
//   const [leaders, setLeaders] = useState([]);

//   useEffect(() => {
//     const fetchLeaderboard = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/leaderboard");
//         const sorted = res.data.sort((a, b) => b.points - a.points);
//         setLeaders(sorted);
//       } catch (error) {
//         console.error("Error fetching leaderboard:", error);
//       }
//     };

//     fetchLeaderboard();
//   }, []);

//   const top3 = leaders.slice(0, 3);
//   const others = leaders.slice(3);

//   const getAvatar = (index) => avatarList[index % avatarList.length];

//   return (
//     <div className=" ">

//       <div className="kingLeader">
//         <h1 className="">Initia Leaderboard</h1>
//       </div>

//       {/* 🥇🥈🥉 Top 3 */}
//       <div className="leaderBordFisrt3">
//         {top3.map((user, index) => (
//           <div key={user._id} className="card">
//             <img src={getAvatar(index)} alt="avatar" className="" />
//             <div className="card-title">{medalEmojis[index]}</div>
//             <div className="card-button ">{user.name || "🎭 Mystery"}</div>
//             <div className="card-content">{user.points} pts</div>
//           </div>
//         ))}
//       </div>

//       {/* 📋 Rest of Leaderboard */}
//       <div className=" restLeaderBoard ">
//         <table className="">
//           <thead className="bg-gray-100 text-gray-700 border ">
//             <tr>
//               <th className="px-4 py-2 ">Rank</th>
//               <th className="px-4 py-2 ">Name</th>
//               <th className="px-4 py-2 ">Points</th>
//             </tr>
//           </thead>
//           <tbody>
//             {others.map((user, index) => (
//               <tr key={user._id} className="text-center">
//                 <td className="px-4 py-2">{index + 4}</td>
//                 <td className="">
//                   <img
//                     src={getAvatar(index + 3)}
//                     alt="avatar"
//                     className="w-8 h-8 rounded-full"
//                   />
//                   <p className="text-center">{user.name || "🎭 Mystery"}</p>
//                 </td>
//                 <td className="px-4 py-2 text-center ">{user.points}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default LeaderboardInitial;

import { useEffect, useState } from "react";
import axios from "axios";

const medalEmojis = ["🥇", "🥈", "🥉"];
const avatarList = [
  "https://i.pravatar.cc/100?img=1",
  "https://i.pravatar.cc/100?img=2",
  "https://i.pravatar.cc/100?img=3",
  "https://i.pravatar.cc/100?img=4",
  "https://i.pravatar.cc/100?img=5",
  "https://i.pravatar.cc/100?img=6",
  "https://i.pravatar.cc/100?img=7",
  "https://i.pravatar.cc/100?img=8",
  "https://i.pravatar.cc/100?img=9",
  "https://i.pravatar.cc/100?img=10",
];

const LeaderboardInitial = () => {
  const [leaders, setLeaders] = useState([]);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get("https://leaderboard-backend-ytsu.onrender.com/api/leaderboard");
      const sorted = res.data.sort((a, b) => b.points - a.points);
      setLeaders(sorted);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const addPoints = async (name) => {
    try {
      await axios.post("https://leaderboard-backend-ytsu.onrender.com/api/leaderboard/add-points", {
        name,
        points: 1,
      });
      fetchLeaderboard(); // refresh after updating
    } catch (err) {
      console.error("Failed to add points:", err);
    }
  };

  const top3 = leaders.slice(0, 3);
  const others = leaders.slice(3);

  const getAvatar = (index) => avatarList[index % avatarList.length];

  return (
    <div className="p-4">
      <div className="kingLeader mb-4">
        <h1 className="text-2xl font-bold text-center">Initial Leaderboard</h1>
        <button
          onClick={() => fetchLeaderboard()}
          className="bg-blue-500 text-white px-4 py-2 rounded my-4"
        >
          Refresh Leaderboard
        </button>
      </div>

      <div className="leaderBordFisrt3 flex justify-center gap-4 mb-6">
        {top3.map((user, index) => (
          <div key={user._id} className="card p-4  rounded text-center">
            <img
              src={getAvatar(index)}
              alt="avatar"
              className="mx-auto w-16 h-16 rounded-full"
            />
            <div className="card-title text-xl mt-2">{medalEmojis[index]}</div>
            <div className="card-button font-semibold">
              {user.name || "🎭 Mystery"}
            </div>
            <div className="card-content text-sm text-gray-600">
              {user.points} pts
            </div>
          </div>
        ))}
      </div>

      <div className="restLeaderBoard overflow-x-auto">
        <table className="min-w-full  ">
          <thead className="bg-gray-100 text-gray-700 border">
            <tr>
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Points</th>
              <th className="px-4 py-2">Add</th>
            </tr>
          </thead>

          <tbody>
            {others.map((user, index) => (
              <tr key={user._id} className="text-center border-t">
                <td className="px-4 py-2">{index + 4}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2 justify-center">
                    <img
                      src={getAvatar(index + 3)}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{user.name || "🎭 Mystery"}</span>
                  </div>
                </td>
                <td className="px-4 py-2">{user.points}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => addPoints(user.name)}
                    className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                  >
                    +1 Point
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardInitial;
