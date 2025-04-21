import React from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../utils/utils';
const Payment = () => {
  const location = useLocation()
  const { formData, checkIn, checkOut, totalPrice } = location.state || {}
  const Navigate = useNavigate()
  const handlePayment = async () => {

    try {
      const { data: order } = await axios.post(`${BACKEND_URL}/api/payment`, {
        amount: totalPrice
      });

      const options = {
        key: "rzp_test_RJu0dSbhpl2Y0H", // Replace with your test key
        amount: totalPrice,
        currency: "INR",
        name: "Darjeeling Homestay",
        description: "Room Booking",
        order_id: order.id,
        handler: async function (response) {
          const res =await axios.post(`${BACKEND_URL}/booking/book`, {
            ...formData,
            checkIn,
            checkOut,
            totalPrice: amount
          });
          if(res.status===200){
            onSuccess("Payment & Booking successful!");
            Navigate('/')
          }
          
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: "#2563eb"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      onSuccess("Payment failed. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-auto mt-6">
      <h2 className="text-lg font-semibold mb-4">Confirm Payment</h2>
      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Stay Duration:</span>
          <span>{checkIn?.toLocaleDateString()} - {checkOut?.toLocaleDateString()}</span>
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

export default Payment;