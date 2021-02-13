const { Schema, model } = require('mongoose')
const SubscribeSchema = new Schema(
  {
    url: { 
      type: Schema.Types.String,
      required: true
    },
    user: { 
      type: Schema.Types.String,
      required: true
    },
    __v: { type: Number, select: false }
  },
  { timestamps: true }, { toObject: { virtuals: true }, toJSON: { virtuals: true } }
)

const Subscribe = model('Subscribe', SubscribeSchema)

module.exports = Subscribe
