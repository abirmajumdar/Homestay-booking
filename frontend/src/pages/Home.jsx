import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import RoomsSection from '../components/RoomImgs'
import BookingForm from '../components/BookingForm'
import AboutSection from '../components/About'
export default function
    () {
    return (
        <div>
            <Navbar />
            <Hero />
            <RoomsSection/>
            <AboutSection/>
            <BookingForm/>
            <Footer />
        </div>
    )
}
