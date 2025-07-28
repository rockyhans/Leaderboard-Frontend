import { useState } from "react";
import axios from "../axios";

const UserSelector = ({ users, onClaimed }) => {
  const [selectedId, setSelectedId] = useState("");

  const handleClaim = async () => {
    if (!selectedId) return;
    const res = await axios.post(`/claim/${selectedId}`);
    // alert(`🎉 ${res.data.points} points awarded!`);
    onClaimed();
  };

  return (
    <div className="userSelect">
      <select
        onChange={(e) => setSelectedId(e.target.value)}
        value={selectedId}
        className="input"
      >
        <option value="">-- Select User --</option>
        {users.map((u) => (
          <option key={u._id} value={u._id}>
            {u.name}
          </option>
        ))}
      </select>
      <button onClick={handleClaim} className="buttonX">
        Claim Points
      </button>
    </div>
  );
};

export default UserSelector;
