const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({

    customerName: {
      type: String,
      required: [true, "Customer name is required!"],
      trim: true,
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      trim: true,
    },
    vehicle: {
      type: String,
      required: [true, "Vehicle is required!"],
      trim: true,
    },
    pickupLocation: {
      type: String,
      default: 'Godagama',
    },
    pickupDate: {
      type: String,
      required: [true, "Pickup date is required!"],
      trim: true,
    },
    pickupTime: {
      type: String,
      required: [true, "Pickup time is required!"],
      trim: true,
    },
    dropoffDate: {
      type: String,
      required: [true, "Dropoff date is required!"],
      trim: true,
    },
    dropoffTime: {
      type: String,
      required: [true, "Dropoff time is required!"],
      trim: true,
    },
    bookingStatus: {
      type: String,
      enum: ["Confirmed", "Cancelled", "Pending"],
      default: "Pending",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
