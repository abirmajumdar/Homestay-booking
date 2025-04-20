const bookingModel =require('../model/booking.model')

const unavailableDates=async(req,res)=>{
    try {
        const bookings = await bookingModel.find();
    
        // Collect all booked date ranges
        const dates = [];
        bookings.forEach(booking => {
          const checkIn = new Date(booking.checkIn);
          const checkOut = new Date(booking.checkOut);
          for (let d = checkIn; d <= checkOut; d.setDate(d.getDate() + 1)) {
            dates.push(new Date(d));
          }
        });
    
        res.json(dates);
      } catch (err) {
        res.status(500).json({ error: 'Server error' });
      }
}
const bookingController=async(req,res)=>{
    try {
        const { name, email, checkIn, checkOut, guests, totalPrice } = req.body;
    
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
    
        // Check if requested dates overlap with existing bookings
        const overlappingBooking = await bookingModel.findOne({
          $or: [
            {
              checkIn: { $lte: checkOutDate },
              checkOut: { $gte: checkInDate }
            }
          ]
        });
    
        if (overlappingBooking) {
          return res.status(409).json({ error: 'Selected dates are already booked.' });
        }
    
        // Save new booking
        const newBooking = new bookingModel({
          name,
          email,
          checkIn: checkInDate,
          checkOut: checkOutDate,
          guests,
          totalPrice
        });
    
        await newBooking.save();
        res.status(201).json({ message: 'Booking confirmed!', booking: newBooking });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      }
}
module.exports = {unavailableDates,bookingController}