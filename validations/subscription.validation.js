const Joi = require('@hapi/joi');
const HttpStatus = require('http-status-codes');
const {
  handleError
} = require('../utils/utils');

exports.validate_create_subscription = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      url: Joi.string().required().label("Subscriber url")
    })
    await schema.validate(req.body);
    next()
  } catch (error) {
    return handleError(req, res, HttpStatus.PRECONDITION_FAILED, error.details, null)
  }
}

exports.validate_topic_param = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      topic: Joi.string().required().label("Subscription topic"),
    })
    await schema.validate(req.params);
    next()
  } catch (error) {
    return handleError(req, res, HttpStatus.PRECONDITION_FAILED, error.details, null)
  }
}