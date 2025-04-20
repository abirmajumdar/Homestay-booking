import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import room1 from '../assets/img/darjeelinghero.jpg';
import room2 from '../assets/img/hotelbooking.jpg';

const rooms = [
  {
    id: 1,
    title: "Cozy Cabin",
    image: room1,
    description: "A peaceful wooden cabin with cozy interiors, private balcony, and a serene forest view. Perfect for solo travelers or couples seeking quiet time.",
    price: "₹3,200 / night",
    features: ["Private balcony", "Mountain View", "Shared Bathroom"]
  },
  {
    id: 2,
    title: "Mountain View Suite",
    image: room2,
    description: "Spacious suite with panoramic views of the Darjeeling hills, complimentary breakfast, and a warm, modern touch.",
    price: "₹4,500 / night",
    features: ["Panoramic view", "Free breakfast", "Private bathroom"]
  },
];

export default function RoomsSection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section id="rooms" className="max-w-screen-xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800" data-aos="fade-down">
        Our Beautiful Rooms
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {rooms.map((room) => (
          <div
            key={room.id}
            data-aos="zoom-in"
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
          >
            <img
              src={room.image}
              alt={room.title}
              className="w-full h-60 object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="p-5 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{room.title}</h3>
                <p className="text-gray-600 mb-4">{room.description}</p>
              </div>
              <div className="flex flex-col space-y-2 mt-auto">
                <span className="text-lg font-bold text-pink-500">{room.price}</span>
                <ul className="text-sm text-gray-500">
                  {room.features.map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
                <a
                  href="#booking"
                  className="btn bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                >
                  Book Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      
    </section>
  );
}
