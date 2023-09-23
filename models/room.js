const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomSchema = new Schema({
  creationDate: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  imageAttribution: {
    type: String,
    required: true
  },
  imageAttributionLink: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  environment: {
    type: String,
    enum: ["city", "battlefield", "castle", "maritime", "forest", "sky", "space", "underground"],
    required: true
  },
  objectives: [],
  timeLimit: {
    type: Number,
    required:true
  },
  gameOverText: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Room", roomSchema)