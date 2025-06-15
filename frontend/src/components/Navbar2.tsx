import  { useEffect, useState } from 'react';
import { FiSearch, FiPlusCircle, FiHome, FiCalendar } from 'react-icons/fi';

import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import ListingDetails from '../pages/ListingDetails';

function Navbar() {
  const [msg, setmsg] = useState("");

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(token)
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded)
        // Assuming your JWT payload looks like { ..., role: "admin" }
        //@ts-ignore
        setRole(decoded.role || "user");
      } catch (err) {
        console.error("Failed to decode token", err);
        setRole("user"); // Fallback to "user" if decoding fails
      }
    }
  }, [token]);


  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setRole("");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white backdrop-blur-sm bg-opacity-90 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">

          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-rose-600 hover:text-rose-700 transition-colors duration-300 flex items-center">
              <span className="mr-1">🏠</span>
              <span className="bg-gradient-to-r from-rose-600 to-amber-500 bg-clip-text text-transparent">
                StayFinder
              </span>
            </a>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center mx-4 flex-1 max-w-2xl">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400 group-hover:text-rose-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:border-rose-300 focus:ring-1 focus:ring-rose-200 outline-none transition-all duration-200 bg-gray-50 hover:bg-white text-sm font-medium"
                onChange={(e) => setmsg(e.target.value)}
                placeholder="Search destinations, homes, experiences..."
              />
              <button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-rose-600 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-rose-700 transition-colors shadow-sm">
                Search
              </button>
            </div>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center space-x-1 md:space-x-4">
            {token && role === "user" && (
              <>
             

                <button 
                  onClick={() => navigate("/my-bookings")} 
                  className="hidden md:flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-rose-600 rounded-full hover:bg-gray-50 transition-colors"
                >
                  <FiCalendar className="mr-2" />
                  <span>My Bookings</span>
                </button>
              </>
            )}

            {token && role === "admin" && (
              <><button 
                  onClick={() => navigate("/my-listings")} 
                  className="hidden md:flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-rose-600 rounded-full hover:bg-gray-50 transition-colors"
                >
                  <FiHome className="mr-2" />
                  <span>My Listings</span>
                </button>
                 

              <button 
                onClick={() => navigate("/addlisting")} 
                className="hidden md:flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-rose-600 rounded-full hover:bg-gray-50 transition-colors"
              >
                <FiPlusCircle className="mr-2" />
                <span>List your home</span>
              </button>
              </>
            )}

            {token ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-full transition-all shadow-sm"
              >
                Logout
              </button>
            ) : (
              <a
                href="/login"
                className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-full transition-all shadow-sm"
              >
                Login
              </a>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <button className="lg:hidden p-2 rounded-md text-gray-500 hover:text-rose-600 focus:outline-none">
            <FiSearch className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden pb-3 px-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:border-rose-300 focus:ring-1 focus:ring-rose-200 outline-none transition-all bg-gray-50 text-sm"
              placeholder="Where to?"
            />
          </div>
        </div>
      </div>
      <ListingDetails msg={msg}></ListingDetails>
    </nav>
  );
}

export default Navbar;
