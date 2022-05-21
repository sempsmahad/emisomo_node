const mongoose = require('mongoose')

const SummonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  topic: {
    type: Number,
    required: true,
  },
  name: {
    type: Number,
    required: true,
  },
  description: {
    type: Number,
    required: true,
  },
  creation_date: {
    type: Number,
    required: true,
  },
  audio: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('Summon', SummonSchema)
