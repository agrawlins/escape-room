const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playthroughSchema = new Schema({
   //User Data
   user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  //Records 
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: true
  },
  time: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model("Playthrough", playthroughSchema)