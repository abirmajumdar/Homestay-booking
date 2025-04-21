import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BACKEND_URL } from '../utils/utils';

export default function Navbar() {
  const [name, setName] = useState();
  const [user, setUser] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const storedUser = localStorage.getItem("User");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);

          const res = await axios.post(`${BACKEND_URL}/user/find-user-details`, {
            email: parsedUser.email,
          });
          setName(res.data.name);
        } catch (err) {
          console.error("Error fetching user details:", err);
          setUser(null);
        }
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("User");
    setUser(null);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-primary">Homestay</a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <a
                href="/register"
                className="px-5 py-2  text-white bg-primary rounded-md hover:bg-primary-focus transition"
              >
                Register
              </a>
              <a
                href="/login"
                className="px-5 py-2 text-white bg-secondary rounded-md hover:bg-secondary-focus transition"
              >
                Login
              </a>
            </>
          ) : (
            <>
              <span className="text-lg font-medium">Hi, {name}</span>
              <button
                onClick={handleLogout}
                className="px-5 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="border border-primary text-primary px-4 py-1 rounded-md font-medium"
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-4 space-y-3 border-t bg-white shadow-sm transition-all duration-300">
          {!user ? (
            <>
              <a
                href="/register"
                className="block w-full text-center text-primary border border-primary py-2 rounded-md hover:bg-primary hover:text-white transition"
              >
                Register
              </a>
              <a
                href="/login"
                className="block w-full text-center text-secondary border border-secondary py-2 rounded-md hover:bg-secondary hover:text-white transition"
              >
                Login
              </a>
            </>
          ) : (
            <>
              <span className="block text-lg font-medium">Hi, {name}</span>
              <button
                onClick={handleLogout}
                className="block w-full text-center text-red-600 border border-red-600 py-2 rounded-md hover:bg-red-600 hover:text-white transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
