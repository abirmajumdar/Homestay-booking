// Import Express
const express = require('express');
const userRoute = require('./Route/userRoute')
const bookingRoute = require('./Route/bookingRoute')
const paymentRoute = require('./Route/paymentRoute')

const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
dotenv.config()

app.use(cors())
app.use(express.json())

const URI = process.env.URI
try{
    mongoose.connect(URI).then(()=>{
        console.log("mongoose connected");
    }).catch((err)=>{
        console.log(err)
    })
}catch(e){
    console.log(e)
}


// Define a route
app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Express.js Tutorial');
});

app.use('/user',userRoute)
app.use('/booking',bookingRoute)
app.use('/api',paymentRoute)
// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
