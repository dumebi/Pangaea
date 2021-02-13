const SubscribeModel = require('../models/subscription.model');
const HttpStatus = require('http-status-codes');
const {
  handleError, handleSuccess, config
} = require('../utils/utils');
const publisher = require('../utils/rabbitmq');

const QuestionController = {
  /**
   * Create Subscription
   * @description Create a subscription
   * @param {string} url 
   * @param {string} topic      
   * @return {object} subscription
   */
  async subscribe(req, res, next) {
    try {
      const { url } = req.body
      const { topic } = req.params

      const subscription = await SubscribeModel.create({
        url,
        topic
      })
      return handleSuccess(req, res, HttpStatus.CREATED, 'Subscription created successfully', {url, body})
    } catch (error) {
      handleError(req, res, HttpStatus.INTERNAL_SERVER_ERROR, 'Could not create subscription', error)
    }
  },

  /**
   * Publish Topic
   * @description Create a subscription
   * @param {string} url 
   * @param {string} topic      
   * @return {object} subscription
   */
  async publish(req, res, next) {
    try {
      const { topic } = req.params

      const subscription = await SubscribeModel.findOne({ topic })
      
      return handleSuccess(req, res, HttpStatus.CREATED, 'Subscription created successfully', {url, body})
    } catch (error) {
      handleError(req, res, HttpStatus.INTERNAL_SERVER_ERROR, 'Could not create subscription', error)
    }
  },
};

module.exports = QuestionController;
