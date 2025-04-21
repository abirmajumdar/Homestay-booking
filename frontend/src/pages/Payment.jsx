import React from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../utils/utils';
import toast from 'react-hot-toast';

export default function Payment ()  {
  const location = useLocation();
  const { formData, checkIn, checkOut, totalPrice } = location.state || {};
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      // Step 1: Create Razorpay order
      const { data: order } = await axios.post(`${BACKEND_URL}/api/payment`, {
        amount: totalPrice,
      });

      // Step 2: Razorpay options
      const options = {
        key: 'rzp_test_UwpSAt2kTgtD31', // ✅ Replace with live key for production
        amount: totalPrice, // amount in paisa
        currency: 'INR',
        name: 'Darjeeling Homestay',
        description: 'Room Booking',
        order_id: order.id,
        handler: async function (res) {
          try {
            // Step 3: Save booking in DB
            const res = await axios.post(`${BACKEND_URL}/booking/book`, {
              ...formData,
              checkIn,
              checkOut,
              totalPrice,
            });
            console.log(res)
            if (res.status === 201) {
              toast.success('Payment & Booking successful!');
              setTimeout(() => navigate('/'), 1000);
            }
          } catch (error) {
            toast.error('Booking saved failed. Contact support.');
            console.error('Booking error:', error);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#2563eb',
        },
      };

      // Step 4: Open Razorpay
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Payment Error:', err);
      toast.error('Payment failed. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-auto mt-6">
      <h2 className="text-lg font-semibold mb-4">Confirm Payment</h2>
      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Stay Duration:</span>
          <span>
            {new Date(checkIn).toLocaleDateString()} - {new Date(checkOut).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Total Price:</span>
          <span>₹{totalPrice}</span>
        </div>
      </div>
      <button
        onClick={handlePayment}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Pay ₹{totalPrice} & Book
      </button>
    </div>
  );
};