const SubscribeModel = require('../models/subscription.model');
const HttpStatus = require('http-status-codes');
const {
  handleError, handleSuccess, config
} = require('../utils/utils');
const { default: PQueue } = require('p-queue');
const queue = new PQueue();
const axios = require('axios').default;
const SubscriptionController = {
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

      await SubscribeModel.create({
        url,
        topic
      })
      return handleSuccess(req, res, HttpStatus.CREATED, 'Subscription created successfully', {url, topic})
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

      const subscriptions = await SubscribeModel.findOne({ topic })

      for (let index = 0; index < subscriptions.length; index++) {
        const subscription = subscriptions[index];
        await queue.add(() =>  axios.post(subscription.url, req.body));
      }
      await queue.onIdle();
      return handleSuccess(req, res, HttpStatus.CREATED, 'data published successfully', {topic, data: req.body})
    } catch (error) {
      handleError(req, res, HttpStatus.INTERNAL_SERVER_ERROR, 'Could not publish data', error)
    }
  },
};

module.exports = SubscriptionController;
