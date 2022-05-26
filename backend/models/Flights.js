const mongoose = require("mongoose");

const FlightsSchema = new mongoose.Schema({
  _id:{type: Number,required: true},
  code: {type: String, required: true},
  price: {type:Number, required: true},
  origin: {type: String,required: true},
  destination: {type: String,required: true},
  emptySeats: {type: Number,required: true},
  date: {type: String,required: true},
  planeType: {type: String,required: true},
  totalSeats: {type: Number,required: true},
  departureTime: {type: String, required: true},
  arrivalTime: {type: String, required: true},
});

module.exports = mongoose.model('Flights', FlightsSchema);