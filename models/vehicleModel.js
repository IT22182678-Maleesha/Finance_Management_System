const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: [true, "Brand is required!"],
        trim: true,
    },
    model: {
        type: String,
        required: [true, "Model is required!"],
        trim: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Category is required!"],
    },
    year: {
        type: Number,
        required: [true, "Year is required!"],
    },
    fuelType: {
        type: String,
        required: [true, "Fuel type is required!"],
        enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
        trim: true,
    },
    rentalPricePerDay: {
        type: Number,
        required: [true, "Rental price is required!"],
    },
    additionalPricePayKilometer: {
        type: Number,
        required: [true, "Additional price per KM is required!"],
    },
    status: {
        type: String,
        required: [true, "Status is required!"],
        enum: ["Available", "Booked", "Maintenance"],
        default: "Available",
        trim: true,
    },
    imageUrl: {
        type: String,
        trim: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
