import { useState } from "react";

const AddUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    createdAt: new Date().toISOString(),
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted of User Intialized ===> ", user)
    const res = await fetch('http://localhost:5000/api/add-user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user
      })
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("Error Encountered while Creating User in Add User Page")
    } else {
      console.log("Successfully Created User Now Navigating to User List")
    }
  }


  return (
    <>
      <div className="container mx-auto p-5">
        <h1 className="text-2xl font-bold mb-4">Add User</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Name" className="border p-2 w-full" onChange={handleChange} required />
          <input type="text" name="email" placeholder="Description" className="border p-2 w-full" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" className="border p-2 w-full" onChange={handleChange} required />
          <select name="role" className="border p-2 w-full" onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Admin">Admin</option>
            <option value="Client">Client</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add User</button>
        </form>
      </div>
    </>
  );
};

export default AddUser;
