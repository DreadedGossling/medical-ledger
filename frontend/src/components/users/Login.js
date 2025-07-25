// Login.jsx
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("clicked", form)
    // try {
    //   const res = await axios.post('http://localhost:5000/api/login', form);
    //   localStorage.setItem('token', res.data.token);
    //   alert('Login Successful');
    // } catch (err) {
    //   alert(err.response.data.error);
    // }
  };

  return (
    <>
      <div className="container mx-auto p-5">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-2 w-full"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="text"
            name="password"
            placeholder="Password"
            className="border p-2 w-full"
            minLength={8}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add User
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
