import axios from 'axios';
import React, { useState,useEffect } from 'react'

export default function Navbar() {
    const [name ,setName ] = useState()
    const [user,setUser] = useState()
    const [isOpen, setIsOpen] = useState(false);
    const [userdetails,setUserDetails] = useState()
    useEffect(() => {
        const fetchUserDetails = async () => {
          const storedUser = localStorage.getItem("User");
          if (storedUser) {
            try {
              const parsedUser = JSON.parse(storedUser);
              setUser(parsedUser);
      
              const res = await axios.post('http://localhost:4000/user/find-user-details', {
                email: parsedUser.email,
              });
              setName(res.data.name)
              console.log("User details from backend:", res.data);
            } catch (err) {
              console.error("Error fetching user details:", err);
              setUser(null);
            }
          }
        };
      
        fetchUserDetails();
      }, []);
    return (
        <nav className="navbar bg-base-100 shadow-md">
        <div className="container mx-auto w-full px-4 flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="navbar-start">
            <a href="/" className="font-bold text-2xl text-primary">Homestay</a>
          </div>
  
          {/* Desktop Links */}
          <div className="hidden md:flex navbar-end space-x-2 items-center">
            {!user ? (
              <>
                <a className="btn btn-sm bg-primary text-white hover:bg-primary-focus transition" href="/register">Register</a>
                <a className="btn btn-sm bg-secondary text-white hover:bg-secondary-focus transition" href="/login">Login</a>
              </>
            ) : (
              <span className="font-medium text-lg">Hi, {name}</span>
            )}
          </div>
  
          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-primary focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
  
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2">
            {!user ? (
              <>
                <a className="block w-full btn btn-sm bg-primary text-white hover:bg-primary-focus" href="/register">Register</a>
                <a className="block w-full btn btn-sm bg-secondary text-white hover:bg-secondary-focus" href="/login">Login</a>
              </>
            ) : (
              <span className="block font-medium text-lg">Hi, {name}</span>
            )}
          </div>
        )}
      </nav>
    )
}
