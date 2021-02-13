const express = require('express');
const SubscriptionController = require('../controllers/subscription.controller')
const { validate_create_subscription, validate_topic_param } = require('../validations/subscription.validation')

const router = express.Router();

router.get('/subscribe/:topic', validate_topic_param, validate_create_subscription, SubscriptionController.subscribe);
router.post('/publish/:topic', validate_topic_param, SubscriptionController.publish);
module.exports = router;
