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
    const validate =  await schema.validate(req.body);
    if (validate.error) throw validate.error;
    next()
  } catch (error) {
    console.log(error)
    return handleError(req, res, HttpStatus.PRECONDITION_FAILED, error.details[0].message, null)
  }
}

exports.validate_create_publishing = async (req, res, next) => {
  try {
    const schema = Joi.object()
    const validate =  await schema.validate(req.body);
    if (validate.error) throw validate.error;
    next()
  } catch (error) {
    console.log(error)
    return handleError(req, res, HttpStatus.PRECONDITION_FAILED, error.details[0].message, null)
  }
}

exports.validate_topic_param = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      topic: Joi.string().required().label("Subscription topic"),
    })
    const validate = await schema.validate(req.params);
    if (validate.error) throw validate.error;
    next()
  } catch (error) {
    console.log(error)
    return handleError(req, res, HttpStatus.PRECONDITION_FAILED, error.details[0].message, null)
  }
}