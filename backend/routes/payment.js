const express = require('express');
const { processPayment,refundPayment, sendStripeApi,processCashOnDelivery } = require('../controllers/paymentController');
const { isAuthenticatedUser,authorizeRoles } = require('../middlewares/authenticate');
const router = express.Router();

router.route('/payment/process').post( isAuthenticatedUser, processPayment);
router.route('/stripeapi').get( isAuthenticatedUser, sendStripeApi);
router.route('/payment/refund').post( isAuthenticatedUser,authorizeRoles('admin'), refundPayment);
router.route('/payment/cod/:id').put(isAuthenticatedUser, processCashOnDelivery);

module.exports = router;