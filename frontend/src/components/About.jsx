import React, { useState } from 'react';
import BookingForm from './BookingForm'; // import the BookingForm component
import AOS from 'aos'; 
import 'aos/dist/aos.css';

// Initializing AOS for animations
AOS.init({ duration: 1000 });

const AboutSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open the modal
  const openModal = () => setIsModalOpen(true);

  // Close the modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <section id="about" className="max-w-screen-xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column - About the Woodsy Stays */}
        <div className="space-y-6" data-aos="fade-right">
          <h2 className="text-4xl lg:text-5xl font-bold text-center lg:text-left text-gray-800 mb-6">About The Woodsy Stays</h2>
          <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
            Welcome to <span className="font-bold text-pink-600">The Woodsy Stays</span> in the heart of Darjeeling, where we offer a homely stay amidst nature's beauty.
          </p>
          <p className="text-lg lg:text-xl text-gray-700 mb-6">
            We provide an intimate experience, allowing our guests to unwind in cozy rooms with breathtaking views of the mountains. Whether you're here for a quiet retreat or an adventurous getaway, we’ve got you covered!
          </p>
          <ul className="space-y-3 text-lg text-gray-600">
            <li><span className="font-semibold">Pet-Friendly:</span> Bring your furry companions with you!</li>
            <li><span className="font-semibold">Stunning Views:</span> Enjoy panoramic views of the Himalayan peaks.</li>
            <li><span className="font-semibold">Local Experience:</span> Explore Darjeeling’s heritage with a homely touch.</li>
          </ul>
        </div>

        {/* Right Column - Booking Button & Image */}
        <div className="flex justify-center lg:justify-start items-center" data-aos="fade-left">
          <div className="relative w-full max-w-md">
            <img 
              src="https://images.unsplash.com/photo-1562901195-358d1d38e39e" // Correct direct URL for the image
              alt="Woodsy Stay" 
              className="w-full rounded-lg shadow-xl object-cover h-[300px] sm:h-[350px] lg:h-[400px] transition-transform duration-500 hover:scale-105"
            />
            {/* Using homestay background image for the overlay */}
            <div 
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1612131267131-72b77a9f37ff)', // Direct link to homestay view
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.5, // Semi-transparent effect to make the content more visible
              }}
            ></div>
            <button
              onClick={openModal}
              className="absolute bottom-4 left-4 bg-indigo-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      <BookingForm isOpen={isModalOpen} closeModal={closeModal} />
    </section>
  );
};


const FacilitiesSection = () => {
  return (
    <section id="facilities" className="bg-gray-50 py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Facilities of The Woodsy Stays
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Facility Item */}

          {/* Facility Item */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Pets</h3>
            <p className="text-lg text-gray-600 mb-4">
              Pets are allowed at The Woodsy Stays. Feel free to bring your furry friend along—no extra charges.
            </p>
          </div>

          {/* Facility Item */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Internet</h3>
            <p className="text-lg text-gray-600 mb-4">
              Unfortunately, no internet access is available at The Woodsy Stays, allowing you to fully unwind and disconnect.
            </p>
          </div>

          {/* Facility Item */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Parking</h3>
            <p className="text-lg text-gray-600 mb-4">
              Currently, there is no parking available at the property, but there are parking options nearby.
            </p>
          </div>

          {/* Facility Item */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Languages Spoken</h3>
            <p className="text-lg text-gray-600 mb-4">
              English and Hindi are spoken by our friendly staff, ensuring seamless communication during your stay.
            </p>
          </div>

          {/* Facility Item */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">House Rules</h3>
            <p className="text-lg text-gray-600 mb-4">
              The Woodsy Stays takes special requests—please let us know your needs during booking for a customized stay.
            </p>
          </div>

          {/* Facility Item */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Check-in</h3>
            <p className="text-lg text-gray-600 mb-4">
              Check-in time is from 12:00 PM to 5:00 PM, ensuring a smooth and relaxed arrival for you.
            </p>
          </div>

          {/* Facility Item */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Check-out</h3>
            <p className="text-lg text-gray-600 mb-4">
              Check-out time is from 10:00 AM to 11:00 AM. We want you to leave with wonderful memories.
            </p>
          </div>

          {/* Facility Item */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Child and Bed Policies</h3>
            <p className="text-lg text-gray-600 mb-4">
              Children of any age are welcome at The Woodsy Stays, making it an ideal place for family stays.
            </p>
          </div>

          {/* Facility Item */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">No Parties</h3>
            <p className="text-lg text-gray-600 mb-4">
              To maintain the peaceful environment, parties/events are not allowed at the property.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { AboutSection, FacilitiesSection };
