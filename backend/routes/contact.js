const express = require('express');
const router = express.Router();
const { 
    createContactMessage, 
    getAllContactMessages, 
    deleteContactMessage 
} = require('../controllers/contactController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');

router.route('/contact').post(createContactMessage);

// Admin Routes
router.route('/admin/contact-messages')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getAllContactMessages);

router.route('/admin/contact-message/:id')
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteContactMessage);

module.exports = router;