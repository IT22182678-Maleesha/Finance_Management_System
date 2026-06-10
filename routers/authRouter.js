const express = require('express');

const authController = require('../controllers/authController');
const { identifierUser, identifierAdmin } = require('../middlewares/identification');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/signout',identifierUser, authController.signout);

router.patch('/sent-verification-code',identifierUser, authController.sendVerificationCode);
router.patch('/verify-verification-code',identifierUser, authController.verifyVerficationCode);

router.patch('/send-forgot-password-code', authController.sendForgotPasswordCode);
router.patch('/verify-forgot-password-code', authController.verifyForgotPasswordCode);
router.patch('/change-password',identifierUser, authController.changePassword);


router.get('/admin',identifierAdmin, authController.adminCheck);


module.exports = router;