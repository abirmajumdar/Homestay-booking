import React, { useState } from 'react';
import RatingModal from './RatingModal';

export default function HeroSection() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      className="relative w-full min-h-[90vh] flex items-center justify-center text-white overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1740&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-10 text-center md:text-left py-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in-down">
          Welcome to <span className="text-pink-400">The Woodsy Stays</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl animate-fade-in-up">
          Discover the perfect blend of comfort and nature. Nestled in serene landscapes, our stays offer a cozy escape with modern amenities.
          Come for the calm, stay for the experience.
        </p>

        {/* Input and Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 animate-fade-in-up">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 w-full sm:w-auto rounded-md text-black focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 transition px-6 py-2 rounded-md"
          >
            Rate Us
          </button>
        </div>

        {/* Modal */}
        <div className="mt-6">
          <RatingModal isOpen={showModal} onClose={() => setShowModal(false)} />
        </div>
      </div>
    </div>
  );
}
