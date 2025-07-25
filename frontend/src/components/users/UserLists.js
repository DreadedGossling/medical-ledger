import { useEffect, useState } from "react";
import axios from "axios";

const UserLists = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users").then((response) => {
      setUsers(response.data.users);
    });
  }, []);

  const changeStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    const res = await fetch(`http://localhost:5000/api/user/update-status/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });
    const data = await res.json();
    if (res.status === 200 && data) {
      setUsers(users.map(user => user._id === id ? { ...user, status: newStatus } : user));
    } else {
      console.log("Error changing status");
    }
  };

  return (
    <div className="mx-auto py-5">
      <h1 className="text-2xl font-bold mb-4">⊚ <span className="underline decoration-wavy decoration-4 decoration-cyan-500">Users</span></h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="border p-2 font-serif capitalize">{user.name}</td>
              <td className="border p-2 font-serif">{user.email}</td>
              <td className="border p-2 font-serif capitalize">{user.role}</td>
              <td className="border p-2 font-serif">{user.description}</td>
              <td className="border p-2 font-serif">{user.status}</td>
              <td className="border p-2 font-serif flex justify-center gap-3">
                <button
                  className={`px-2 py-1 rounded shadow-md transition ease-in-out ${user.status === "Active" ? "bg-green-600 text-white hover:bg-green-800" : "bg-gray-400 text-white hover:bg-gray-600"}`}
                  onClick={() => changeStatus(user._id, user.status)}>
                  {user.status === "Active" ? "Set Inactive" : "Set Active"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserLists;
