const Joi = require('joi');

exports.signupSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(6).max(60).required().email({ tlds: { allow: ['com', 'net'] } }),
    phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).required(),
    password: Joi.string().min(6).required().pattern(new RegExp('^[a-zA-Z0-9@#$%^&+=!*()-_]{6,}$'))
});

exports.signinSchema = Joi.object({ 
    email: Joi.string().min(6).max(60).required().email({ tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(6).required().pattern(new RegExp('^[a-zA-Z0-9@#$%^&+=!*()-_]{6,}$'))
});

exports.acceptCodeSchema = Joi.object({
    email: Joi.string().min(6).max(60).required().email({ tlds: { allow: ['com', 'net'] } }),
    providedCode:Joi.number().required()
});

exports.changePasswordSchema = Joi.object({
    newPassword: Joi.string().min(6).required().pattern(new RegExp('^[a-zA-Z0-9@#$%^&+=!*()-_]{6,}$')),
    oldPassword: Joi.string().min(6).required().pattern(new RegExp('^[a-zA-Z0-9@#$%^&+=!*()-_]{6,}$'))
});

exports.acceptForgotPasswordSchema = Joi.object({
    email: Joi.string().min(6).max(60).required().email({ tlds: { allow: ['com', 'net'] } }),
    providedCode: Joi.number().required(),
    newPassword: Joi.string().min(6).required().pattern(new RegExp('^[a-zA-Z0-9@#$%^&+=!*()-_]{6,}$'))
});

exports.createVehicleSchema = Joi.object({
    brand: Joi.string().min(2).max(50).required().trim(),
    model: Joi.string().min(2).max(50).required().trim(),
    category: Joi.string().required().trim(),
    year: Joi.number().integer().min(1950).max(new Date().getFullYear()).required(),
    fuelType: Joi.string().valid("Petrol", "Diesel", "Electric", "Hybrid").required(),
    rentalPricePerDay: Joi.number().min(0).required(),
    additionalPricePayKilometer: Joi.number().min(0).required(),
    status: Joi.string().valid("Available", "Booked", "Maintenance").default("Available"),
    imageUrl: Joi.string().uri().trim(),
});

exports.createCategorySchema = Joi.object({ 
    name: Joi.string().min(3).max(60).required(),
    description: Joi.string().min(6).max(255).required()
});

exports.createBookingSchema = Joi.object({
    customerName: Joi.string().min(2).max(50).required().trim(),
    contactNumber: Joi.string().pattern(/^[0-9]{10}$/).required().trim(),
    email: Joi.string().email().required().trim(),
    vehicle: Joi.string().min(2).max(50).required().trim(),
    pickupLocation: Joi.string().default("Godagama").trim(),
    pickupDate: Joi.date().iso().required(),
    pickupTime: Joi.string().required().trim(),
    dropoffDate: Joi.date().iso().required(),
    dropoffTime: Joi.string().required().trim(),
    bookingStatus: Joi.string().valid("Confirmed", "Cancelled", "Pending").default("Pending"),
    userId: Joi.string().required(),
});
