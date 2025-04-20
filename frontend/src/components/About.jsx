// import React, { useEffect } from 'react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import roomImage1 from '../assets/img/darjeelinghero.jpg'; // Replace with your images

// const AboutSection = () => {
//   useEffect(() => {
//     AOS.init({ duration: 1000, once: true });
//   }, []);

//   return (
//     <section id="about" className="max-w-screen-xl mx-auto px-4 py-16">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//         {/* Left side content */}
//         <div className="space-y-6" data-aos="fade-right">
//           <h2 className="text-4xl font-bold text-center lg:text-left text-gray-800 mb-6">About The Woodsy Stays</h2>
//           <p className="text-lg text-gray-700">
//             Welcome to <span className="font-bold text-pink-600">The Woodsy Stays</span> in the heart of Darjeeling,
//             where we offer a homely stay amidst nature's beauty. Our homestay is designed for travelers seeking a
//             peaceful retreat with a blend of modern comforts and traditional charm.
//           </p>
//           <p className="text-lg text-gray-700">
//             We provide an intimate experience, allowing our guests to unwind in cozy rooms with breathtaking views of
//             the mountains. Whether you're here for a relaxing getaway or an adventure, you'll find the perfect place to
//             call home during your stay.
//           </p>
//           <ul className="space-y-3 text-lg text-gray-600">
//             <li><span className="font-semibold">Pet-Friendly:</span> Bring your furry companions with you!</li>
//             <li><span className="font-semibold">Stunning Views:</span> Enjoy panoramic views of the Himalayan peaks.</li>
//             <li><span className="font-semibold">Local Experience:</span> Explore Darjeeling’s heritage with a homely touch.</li>
//           </ul>
//         </div>

//         {/* Right side image */}
//         <div data-aos="fade-left">
//           <img
//             src={roomImage1}
//             alt="The Woodsy Stays"
//             className="w-full h-full object-cover rounded-lg shadow-lg"
//           />
//         </div>
//       </div>

//       {/* Optional: Add a CTA for booking or contact */}
//       <div className="mt-12 text-center">
//         <p className="text-lg text-gray-700 mb-6">
//           Ready to experience the warmth of The Woodsy Stays? Book your stay with us today and create unforgettable memories!
//         </p>
//         <a
//           href="#booking"
//           className="btn bg-indigo-600 text-white px-8 py-3 rounded hover:bg-indigo-700 transition"
//         >
//           Book Now
//         </a>
//       </div>
//     </section>
//   );
// };

// export default AboutSection;
import React, { useState } from 'react';
import BookingForm from './BookingForm'; // import the BookingForm component

const AboutSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open the modal
  const openModal = () => setIsModalOpen(true);

  // Close the modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <section id="about" className="max-w-screen-xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-center lg:text-left text-gray-800 mb-6">About The Woodsy Stays</h2>
          <p className="text-lg text-gray-700">
            Welcome to <span className="font-bold text-pink-600">The Woodsy Stays</span> in the heart of Darjeeling,
            where we offer a homely stay amidst nature's beauty.
          </p>
          <p className="text-lg text-gray-700">
            We provide an intimate experience, allowing our guests to unwind in cozy rooms with breathtaking views of
            the mountains.
          </p>
          <ul className="space-y-3 text-lg text-gray-600">
            <li><span className="font-semibold">Pet-Friendly:</span> Bring your furry companions with you!</li>
            <li><span className="font-semibold">Stunning Views:</span> Enjoy panoramic views of the Himalayan peaks.</li>
            <li><span className="font-semibold">Local Experience:</span> Explore Darjeeling’s heritage with a homely touch.</li>
          </ul>
        </div>

        <div>
          <button
            onClick={openModal}
            className="bg-indigo-600 text-white px-8 py-3 rounded hover:bg-indigo-700 transition"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Booking Form Modal */}
      <BookingForm isOpen={isModalOpen} closeModal={closeModal} />
    </section>
  );
};

export default AboutSection;
