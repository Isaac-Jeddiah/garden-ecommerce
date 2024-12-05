const Contact = require('../models/contactModel');
const catchAsyncError = require('../middlewares/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');

// Create New Contact Message
exports.createContactMessage = catchAsyncError(async (req, res, next) => {
    const { name, email, phoneNumber, subject, message } = req.body;

    const contactMessage = await Contact.create({
        name,
        email,
        phoneNumber,
        subject,
        message
    });

    res.status(201).json({
        success: true,
        message: 'Your message has been sent successfully',
        contactMessage
    });
});

// Get All Contact Messages (Admin)
exports.getAllContactMessages = catchAsyncError(async (req, res, next) => {
    const contactMessages = await Contact.find();

    res.status(200).json({
        success: true,
        count: contactMessages.length,
        contactMessages
    });
});

// Delete Contact Message (Admin)
exports.deleteContactMessage = catchAsyncError(async (req, res, next) => {
    const contactMessage = await Contact.findById(req.params.id);

    if (!contactMessage) {
        return next(new ErrorHandler(`Contact message not found with id: ${req.params.id}`, 404));
    }

    await contactMessage.remove();

    res.status(200).json({
        success: true,
        message: 'Contact message deleted successfully'
    });
});