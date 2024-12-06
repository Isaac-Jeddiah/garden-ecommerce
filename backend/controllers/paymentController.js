const catchAsyncError = require('../middlewares/catchAsyncError');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/orderModel');

exports.processPayment = catchAsyncError(async (req, res, next) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "usd",
        description: "TEST PAYMENT",
        metadata: { integration_check: "accept_payment" },
        shipping: req.body.shipping,
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret,
    });
});

exports.sendStripeApi = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY,
    });
});

// Add refundPayment method
exports.refundPayment = catchAsyncError(async (req, res, next) => {
    const { paymentIntentId, reason } = req.body;

    if (!paymentIntentId) {
        return res.status(400).json({
            success: false,
            message: "Payment Intent ID is required",
        });
    }

    try {
        // Process the refund with Stripe
        const refund = await stripe.refunds.create({
            payment_intent: paymentIntentId,
            reason: reason || "requested_by_customer",
        });

        // Update the order's payment status to "refunded"
        const order = await Order.findOneAndUpdate(
            { "paymentInfo.id": paymentIntentId }, // Find the order with the given paymentIntentId
            { "paymentInfo.status": "Refunded" }, // Update paymentInfo.status to "refunded"
            { new: true } // Return the updated document
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Refund processed successfully",
            refund,
            updatedOrder: order, // Send the updated order in the response
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


exports.processCashOnDelivery = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found"
        });
    }

    // Update payment info for cash on delivery
    order.paymentInfo = {
        status: "Cash On Delivery",
        method: "COD"
    };

    await order.save();

    res.status(200).json({
        success: true,
        message: "Order updated for cash on delivery"
    });
});
