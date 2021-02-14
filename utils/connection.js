const mongoose = require('mongoose');
const utils = require('../utils/utils');
const RabbitMQ = require('./rabbitmq')
const subscriber = require('./rabbitmq')
const { sendUserToken, sendUserSignupEmail, sendQuestionAnsweredEmail } = require('../utils/emails');
const { sendMail } = require('../utils/utils');
require('dotenv').config();

// Socket config
module.exports = {
  mongo() {
    mongoose.promise = global.promise;
    mongoose
      .connect(utils.config.mongo, {
        keepAlive: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 500
      })
      .then(() => {
        console.log('MongoDB is connected')
      })
      .catch((err) => {
        console.log(err)
        console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
        setTimeout(this.mongo, 5000)
      })
  },
  async rabbitmq() {
    RabbitMQ.init(utils.config.amqp_url);
  },
}
