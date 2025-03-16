const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  cityName: {
    type: String,
    required: [true, "City name is required"],
    trim: true,
  },
  country: {
    type: String,
    required: [true, "Country name is required"],
    trim: true,
  },
  emoji: String,
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  notes: String,
  position: {
    lat: {
      type: Number,
      required: [true, "Latitude is required"],
    },
    lng: {
      type: Number,
      required: [true, "Longitude is required"],
    },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const City = mongoose.model("City", citySchema);

module.exports = City;
