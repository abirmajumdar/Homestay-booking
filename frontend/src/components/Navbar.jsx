// import axios from 'axios';
// import React, { useState,useEffect } from 'react'

// export default function Navbar() {
//     const [name ,setName ] = useState()
//     const [user,setUser] = useState()
//     const [isOpen, setIsOpen] = useState(false);
//     const [userdetails,setUserDetails] = useState()
//     useEffect(() => {
//         const fetchUserDetails = async () => {
//           const storedUser = localStorage.getItem("User");
//           if (storedUser) {
//             try {
//               const parsedUser = JSON.parse(storedUser);
//               setUser(parsedUser);
      
//               const res = await axios.post('http://localhost:4000/user/find-user-details', {
//                 email: parsedUser.email,
//               });
//               setName(res.data.name)
//               console.log("User details from backend:", res.data);
//             } catch (err) {
//               console.error("Error fetching user details:", err);
//               setUser(null);
//             }
//           }
//         };
      
//         fetchUserDetails();
//       }, []);
//     return (
//         <nav className="navbar bg-base-100 shadow-md">
//         <div className="container mx-auto w-full px-4 flex items-center justify-between h-16">
          
//           {/* Logo */}
//           <div className="navbar-start">
//             <a href="/" className="font-bold text-2xl text-primary">Homestay</a>
//           </div>
  
//           {/* Desktop Links */}
//           <div className="hidden md:flex navbar-end space-x-2 items-center">
//             {!user ? (
//               <>
//                 <a className="btn btn-sm bg-primary text-white hover:bg-primary-focus transition" href="/register">Register</a>
//                 <a className="btn btn-sm bg-secondary text-white hover:bg-secondary-focus transition" href="/login">Login</a>
//               </>
//             ) : (
//               <span className="font-medium text-lg">Hi, {name}</span>
//             )}
//           </div>
  
//           {/* Mobile Hamburger */}
//           <div className="md:hidden">
//             <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-primary focus:outline-none">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 {isOpen ? (
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                 ) : (
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>
  
//         {/* Mobile Menu */}
//         {isOpen && (
//           <div className="md:hidden px-4 pb-4 space-y-2">
//             {!user ? (
//               <>
//                 <a className="block w-full btn btn-sm bg-primary text-white hover:bg-primary-focus" href="/register">Register</a>
//                 <a className="block w-full btn btn-sm bg-secondary text-white hover:bg-secondary-focus" href="/login">Login</a>
//               </>
//             ) : (
//               <span className="block font-medium text-lg">Hi, {name}</span>
//             )}
//           </div>
//         )}
//       </nav>
//     )
// }
import axios from 'axios';
import React, { useState, useEffect } from 'react';

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

          const res = await axios.post('http://localhost:4000/user/find-user-details', {
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
