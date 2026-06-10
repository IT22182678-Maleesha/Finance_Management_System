const express = require('express');

const categoryController = require('../controllers/categoryController');
const { identifierUser, identifierAdmin } = require('../middlewares/identification');

const router = express.Router();

router.get('/all-category', categoryController.getCategories);
router.post('/create-category',identifierAdmin, categoryController.createCategory);
router.put('/update-category',identifierAdmin, categoryController.updateCategory);
router.delete('/delete-category',identifierAdmin, categoryController.deleteCategory);




module.exports = router;