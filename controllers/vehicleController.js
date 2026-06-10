const { createVehicleSchema } = require("../middlewares/validator");
const vehicle = require("../models/vehicleModel");

exports.getVehicles = async (req,res) => {
    const {page} = req.query;
    const vehiclePostPerPage = 10;

    try{
        //pagination
        let pageNum = 0;
        if (page <= 1) {
            pageNum = 0;
        }else{
            pageNum = page -1;
        }
        const result = await vehicle.find().sort({createdAt: -1}).skip(pageNum * vehiclePostPerPage).limit(vehiclePostPerPage);

        res.status(200).json({success: true, message:'vehicle posts', data:result});
    }catch(error){
        console.log(error);
    }
}

exports.createVehicle = async (req, res) => {
    try {
        const { 
            brand, 
            model, 
            category, 
            year, 
            fuelType, 
            rentalPricePerDay, 
            additionalPricePayKilometer, 
            status, 
            imageUrl 
        } = req.body;

        const { userId } = req.user;

        // Validate input
        const { error } = createVehicleSchema.validate({
            brand, 
            model,  
            year, 
            fuelType, 
            rentalPricePerDay, 
            additionalPricePayKilometer, 
            status, 
            imageUrl,
        });

        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        // Create new vehicle
        const newVehicle = await vehicle.create({
            brand, 
            model, 
            category, 
            year, 
            fuelType, 
            rentalPricePerDay, 
            additionalPricePayKilometer, 
            status, 
            imageUrl,
            userId
        });

        res.status(201).json({ success: true, message: "Vehicle added successfully!", vehicle: newVehicle });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding vehicle", error: error.message });
    }
};



exports.getSingleVehicles = async (req,res) => {
    const {_id} = req.query;

    try{

        const existingVehicle = await vehicle.findOne({ _id });

        if (!existingVehicle) {
            return res.status(404).json({ success: false, message: "Vehicle Unavailable" });
        }
        
        const result = await vehicle.findOne({_id});

        res.status(200).json({success: true, message:'single vehicle posts', data:result});
    }catch(error){
        console.log(error);
    }
}




exports.updateVehicle = async (req, res) => {

    try {
        const {_id} = req.query;

        const { 
            brand, 
            model, 
            category, 
            year, 
            fuelType, 
            rentalPricePerDay, 
            additionalPricePayKilometer, 
            status, 
            imageUrl 
        } = req.body;

        const { userId } = req.user;

        // Validate input
        const { error } = createVehicleSchema.validate({
            brand, 
            model,  
            year, 
            fuelType, 
            rentalPricePerDay, 
            additionalPricePayKilometer, 
            status, 
            imageUrl,
        });

        if (error) {
            return res.status(404).json({ success: false, message: error.details[0].message });
        }

        const existingVehicle = await vehicle.findOne({ _id });

        if (!existingVehicle) {
            return res.status(404).json({ success: false, message: "Vehicle Unavailable" });
        }

        if (existingVehicle.userId.toString() !== userId) {
            return res.status(403).json({ success: false, message: "Unauthorize" });
            
        }

        existingVehicle.brand = brand;
        existingVehicle.model = model;
        existingVehicle.category = category;
        existingVehicle.year = year;
        existingVehicle.fuelType = fuelType;
        existingVehicle.rentalPricePerDay = rentalPricePerDay;
        existingVehicle.additionalPricePayKilometer = additionalPricePayKilometer;
        existingVehicle.status = status;
        existingVehicle.imageUrl = imageUrl;


        const newVehicle = await existingVehicle.save();

        res.status(201).json({ success: true, message: "Vehicle updated successfully!", vehicle: newVehicle });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating vehicle", error: error.message });
    }
};



exports.deleteVehicle = async (req, res) => {

    try {
        const {_id} = req.query;
        const { userId } = req.user;

        const existingVehicle = await vehicle.findOne({ _id });

        if (!existingVehicle) {
            return res.status(404).json({ success: false, message: "Vehicle Unavailable" });
        }

        if (existingVehicle.userId.toString() !== userId) {
            return res.status(403).json({ success: false, message: "Unauthorize" });
            
        }

        await vehicle.deleteOne({_id});

        res.status(201).json({ success: true, message: "Vehicle deleted successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting vehicle", error: error.message });
    }
};