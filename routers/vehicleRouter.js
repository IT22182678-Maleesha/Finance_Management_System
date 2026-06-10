const express = require('express');

const vehicleController = require('../controllers/vehicleController');
const { identifierUser, identifierAdmin } = require('../middlewares/identification');

const router = express.Router();

router.get('/all-vehicles', vehicleController.getVehicles);
router.get('/single-vehicle', vehicleController.getSingleVehicles);
router.post('/create-vehicle', identifierAdmin, vehicleController.createVehicle);

router.put('/update-vehicle',identifierAdmin, vehicleController.updateVehicle);
router.delete('/delete-vehicle',identifierAdmin, vehicleController.deleteVehicle);


module.exports = router;