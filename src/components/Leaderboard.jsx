const Leaderboard = ({ users }) => {
  return (
    <div className="adminLederboard">
      <table border="1" cellPadding="8" className="w-full">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="text-center">{u.rank}</td>
              <td className="text-center">{u.name}</td>
              <td className="text-center">{u.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
