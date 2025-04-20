const express = require('express')
const { unavailableDates, bookingController } = require('../controller/bookingController')

const router = express.Router()

router.get('/unavailable-dates',unavailableDates)
router.post('/book',bookingController)


module.exports = router