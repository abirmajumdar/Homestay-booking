import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { XIcon } from '@heroicons/react/outline'; // Importing XIcon from Heroicons
import { BACKEND_URL } from '../utils/utils';

const BookingForm = ({ isOpen, closeModal }) => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: 1
  });
  const [message, setMessage] = useState('');
  const Navigate = useNavigate();

  // Fetch unavailable dates
  useEffect(() => {
    axios.get(`${BACKEND_URL}/booking/unavailable-dates`)
      .then(res => {
        const dates = res.data.map(date => new Date(date));
        setUnavailableDates(dates);
      });
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkIn || !checkOut) {
      setMessage('Please select both check-in and check-out dates.');
      return;
    }

    const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const totalPrice = days * 1500; // Replace with your price per night

    try {
      const res = await axios.post(`${BACKEND_URL}/booking/book`, {
        ...formData,
        checkIn,
        checkOut,
        totalPrice
      });

      Navigate('/payment', {
        state: {
          formData,
          checkIn,
          checkOut,
          totalPrice
        }
      });

    } catch (err) {
      setMessage(err.response?.data?.error || 'Booking failed');
    }
  };

  if (!isOpen) return null; // Don't render anything if modal is closed

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto relative">
        {/* Close Button with Cross Icon */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <XIcon className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Book Your Stay</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="guests"
            placeholder="Number of Guests"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            value={formData.guests}
            min={1}
          />

          <div className="flex space-x-2">
            <DatePicker
              selected={checkIn}
              onChange={(date) => {
                setCheckIn(date);
                if (checkOut && date >= checkOut) setCheckOut(null);
              }}
              excludeDates={unavailableDates}
              minDate={new Date()}
              placeholderText="Check-in"
              className="w-full p-2 border rounded"
            />
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              excludeDates={unavailableDates}
              minDate={checkIn ? new Date(checkIn.getTime() + 86400000) : new Date()}
              placeholderText="Check-out"
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Book Now
          </button>
        </form>

        {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}
      </div>
    </div>
  );
};

export default BookingForm;
