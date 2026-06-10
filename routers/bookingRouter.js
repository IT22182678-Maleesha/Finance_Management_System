const express = require('express');

const bookingController = require('../controllers/bookingController');
const { identifierUser, identifierAdmin } = require('../middlewares/identification');

const router = express.Router();

router.get('/all-booking', bookingController.getBooking);
router.get('/single-booking', bookingController.getSingleBooking);
router.get('/user-booking', identifierUser, bookingController.getBookingsByUser);
router.post('/create-booking',identifierUser, bookingController.createBooking);

router.put('/update-booking',identifierUser, bookingController.updateBooking);
router.delete('/delete-booking',identifierUser, bookingController.deleteBooking);



module.exports = router;