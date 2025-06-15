import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const navigate=useNavigate();
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async(e:any) => {
    e.preventDefault();
    try{
      console.log(formData);
      const res=await axios.post("https://stayfinder-juli.onrender.com/api/auth/register",{
        name:formData.name,
        email:formData.email,
        password:formData.password,
        role:formData.role
      });
      console.log(res.data);
      localStorage.setItem("token",res.data.token);
      navigate("/")
    }catch(e){
      alert("failed"+e)
    }
  
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-rose-600 mb-2">StayFinder</h1>
          <p className="text-gray-600">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none transition"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none transition"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none transition"
              required

            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Type
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === 'user'}
                  onChange={handleChange}
                  className="text-rose-600 focus:ring-rose-500"
                />
                <span className="ml-2 text-gray-700">User</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === 'admin'}
                  onChange={handleChange}
                  className="text-rose-600 focus:ring-rose-500"
                />
                <span className="ml-2 text-gray-700">Admin</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-rose-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-rose-700 transition"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-rose-600 hover:text-rose-700">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;