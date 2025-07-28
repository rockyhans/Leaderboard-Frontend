import { useState } from "react";
import axios from "../axios";

const AddUser = ({ onUserAdded }) => {
  const [name, setName] = useState("");
  const handleAdd = async () => {
    if (!name) return;
    const res = await axios.post("/users", { name });
    onUserAdded(res.data);
    setName("");
  };

  return (
    <div className="addUser">
      <input
        type="text"
        placeholder="Enter user name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input"
      />
      <button onClick={handleAdd} className="buttonX">
        Add User
      </button>
    </div>
  );
};

export default AddUser;
