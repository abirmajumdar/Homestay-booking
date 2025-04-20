const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },

  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  },

  guests: {
    type: Number,
    default: 1
  },

  totalPrice: {
    type: Number,
    required: true,
    default:1000
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'confirmed'
  },

  note: String // optional internal note for admin use
});

module.exports = mongoose.model('Booking', BookingSchema);