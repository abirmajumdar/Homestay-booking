import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const rooms = [
  {
    id: 1,
    title: "Wooden Retreat",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1740&q=80",
    description: "A warm wooden interior nestled in nature with modern amenities and a cozy fireplace.",
    price: "₹3,800 / night",
    features: ["Private Balcony", "Fireplace", "Mountain View"]
  },
  {
    id: 2,
    title: "Nature Suite",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=1740&q=80",
    description: "Wake up to the sound of birds in this open, airy suite with a direct garden view.",
    price: "₹4,200 / night",
    features: ["Garden Access", "King Bed", "Complimentary Breakfast"]
  },
  {
    id: 3,
    title: "Hillside Haven",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1740&q=80",
    description: "Overlooking lush hills, this room offers tranquility and elegance all in one.",
    price: "₹4,000 / night",
    features: ["Scenic View", "Smart TV", "Wi-Fi Included"]
  },
  {
    id: 4,
    title: "Rustic Studio",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1740&q=80",
    description: "Perfect for solo travelers or digital nomads with a rustic touch and work desk.",
    price: "₹2,900 / night",
    features: ["Work Desk", "Fast Wi-Fi", "Compact Kitchen"]
  },
  {
    id: 5,
    title: "Luxe Homestay",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1740&q=80",
    description: "Luxury experience with elegant interiors, a soaking tub, and a mountain view.",
    price: "₹6,000 / night",
    features: ["Soaking Tub", "Luxury Linens", "Private Entrance"]
  },
  {
    id: 6,
    title: "Family Nest",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1740&q=80",
    description: "Spacious room perfect for families with kids, featuring bunk beds and a small play area.",
    price: "₹5,000 / night",
    features: ["Kid-Friendly", "Mini Play Zone", "Double Beds"]
  }
];

export default function RoomsSection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section id="rooms" className="max-w-screen-xl mx-auto px-4 md:px-10 py-16">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800" data-aos="fade-down">
        🛏️ Explore Our Stays
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {rooms.map((room) => (
          <div
            key={room.id}
            data-aos="fade-up"
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
          >
            <img
              src={room.image}
              alt={room.title}
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">{room.title}</h3>
                <p className="text-gray-600 mb-4">{room.description}</p>
              </div>
              <div className="mt-auto">
                <span className="text-lg font-bold text-pink-500">{room.price}</span>
                <ul className="text-sm text-gray-500 mt-2 mb-4 space-y-1">
                  {room.features.map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
                <a
                  href="#booking"
                  className="inline-block w-full text-center bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
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
