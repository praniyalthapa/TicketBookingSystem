// const express = require('express');

// const { BookingController } = require('../../controllers/index');

// const router = express.Router();

// router.post('/bookings', BookingController.create);
// module.exports = router;
const express = require('express');

const { BookingController } = require('../../controllers/index');

const bookingController = new BookingController();
const router = express.Router();

router.post('/bookings', bookingController.create);
module.exports = router;
