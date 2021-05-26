const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
})

commentSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = doc._id.toString()
    delete ret._id
    delete ret.__v
  }
})

module.exports = mongoose.model('Comment', commentSchema)
