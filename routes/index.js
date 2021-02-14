const express = require('express');
const SubscriptionController = require('../controllers/subscription.controller')
const { validate_create_subscription, validate_topic_param, validate_create_publishing } = require('../validations/subscription.validation')

const router = express.Router();

router.post('/subscribe/:topic', validate_topic_param, validate_create_subscription, SubscriptionController.subscribe);
router.post('/publish/:topic', validate_topic_param, validate_create_publishing, SubscriptionController.publish);
module.exports = router;
