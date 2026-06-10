const { createBookingSchema } = require("../middlewares/validator");
const Booking = require("../models/bookingModel");



exports.getBooking = async (req,res) => {
    try {
        const result = await Booking.find();
        res.status(200).json({ success: true, message: 'Booking list retrieved successfully', data: result });
    } catch (error) {
        console.error("Error fetching booking:", error);
        res.status(500).json({ success: false, message: "Error fetching booking", error: error.message });
    }
}


exports.createBooking = async (req, res) => {
    try {
        const {
            customerName,
            contactNumber,
            email,
            vehicle,
            pickupLocation,
            pickupDate,
            pickupTime,
            dropoffDate,
            dropoffTime
        } = req.body;

        const { userId } = req.user;

        // Validate input
        const { error } = createBookingSchema.validate({
            customerName,
            contactNumber,
            email,
            vehicle,
            pickupLocation,
            pickupDate,
            pickupTime,
            dropoffDate,
            dropoffTime,
            userId
        });
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        // Create a new booking
        const newBooking = await Booking.create({
            customerName,
            contactNumber,
            email,
            vehicle,
            pickupLocation: pickupLocation || "Godagama",
            pickupDate,
            pickupTime,
            dropoffDate,
            dropoffTime,
            userId
        });

        res.status(201).json({ success: true, message: "Booking created successfully!", booking: newBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating booking", error: error.message });
    }
};

exports.getSingleBooking = async (req,res) => {
    const {_id} = req.query;

    try{
        const existingBooking = await Booking.findOne({ _id });

        if (!existingBooking) {
            return res.status(404).json({ success: false, message: "Booking Unavailable" });
        }
        
        const result = await Booking.findOne({_id});

        res.status(200).json({success: true, message:'single Booking', data:result});
    }catch(error){
        console.log(error);
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const { _id } = req.query;

        const {
            customerName,
            contactNumber,
            email,
            vehicle,
            pickupLocation,
            pickupDate,
            pickupTime,
            dropoffDate,
            dropoffTime,
        } = req.body;

        const { userId } = req.user;

        // Validate input
        const { error } = createBookingSchema.validate({
            customerName,
            contactNumber,
            email,
            vehicle,
            pickupLocation,
            pickupDate,
            pickupTime,
            dropoffDate,
            dropoffTime,
            userId
        });

        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        // Find the booking by ID
        const existingBooking = await Booking.findById(_id);

        if (!existingBooking) {
            return res.status(404).json({ success: false, message: "Booking not found!" });
        }

        // Check if the user is authorized to update the booking
        if (existingBooking.userId.toString() !== userId) {
            return res.status(403).json({ success: false, message: "Unauthorized access!" });
        }

        // Update booking details
        existingBooking.customerName = customerName;
        existingBooking.contactNumber = contactNumber;
        existingBooking.email = email;
        existingBooking.vehicle = vehicle;
        existingBooking.pickupLocation = pickupLocation;
        existingBooking.pickupDate = pickupDate;
        existingBooking.pickupTime = pickupTime;
        existingBooking.dropoffDate = dropoffDate;
        existingBooking.dropoffTime = dropoffTime;

        // Save the updated booking
        const updatedBooking = await existingBooking.save();

        res.status(200).json({ success: true, message: "Booking updated successfully!", booking: updatedBooking });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating booking", error: error.message });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const {_id} = req.query;

        const existingBooking = await Booking.findOne({ _id });

        if (!existingBooking) {
            return res.status(404).json({ success: false, message: "Booking Unavailable" });
        }
        await Booking.deleteOne({_id});

        res.status(201).json({ success: true, message: "booking deleted successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting booking", error: error.message });
    }
};


exports.getBookingsByUser = async (req, res) => {
    try {
        const { userId } = req.user;

        // Find all bookings for the given userId
        const userBookings = await Booking.find({ userId });

        if (userBookings.length === 0) {
            return res.status(404).json({ success: false, message: "No bookings found for this user." });
        }

        res.status(200).json({ success: true, bookings: userBookings });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving bookings", error: error.message });
    }
};
