import React, { useState } from 'react';
import booking from '../assets/img/hotelbooking.jpg';
import RatingModal from './RatingModal';

export default function HeroSection() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-screen-2xl container mx-auto px-4 md:px-20 py-10 flex flex-col-reverse md:flex-row items-center gap-12">
      
      {/* Text Section */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-800">
          Welcome to <span className="text-pink-500">The Woodsy Stays</span>
        </h1>
        <p className="mt-6 text-gray-600 text-lg">
          Discover the perfect blend of comfort and nature. Nestled in serene landscapes, our stays offer a cozy escape with modern amenities. Come for the calm, stay for the experience.
        </p>

        {/* Email Input + Rate Us Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center sm:justify-start gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full sm:w-auto px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            onClick={() => setShowModal(true)}
            className="btn bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Rate Us
          </button>
        </div>

        {/* Modal */}
        <div className="mt-6">
          <RatingModal isOpen={showModal} onClose={() => setShowModal(false)} />
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full md:w-1/2 relative">
        <img
          src={booking}
          alt="Booking illustration"
          className="w-full h-auto rounded-xl shadow-lg transition-transform duration-500 hover:scale-105"
        />
      </div>
    </div>
  );
}
