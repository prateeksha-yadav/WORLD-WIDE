const City = require("./../models/City");

exports.createCity = async (req, res) => {
  try {
    const { cityName, country, emoji, date, notes, position } = req.body;

    const city = await City.create({
      cityName,
      country,
      emoji,
      date,
      notes,
      position,
      userId: req.user._id,
    });

    res.status(201).json({
      message: "City created successfully!",
      city,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCities = async (req, res) => {
  try {
    const cities = await City.find({ userId: req.user._id });
    res.status(200).json({ cities });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCity = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    res.status(200).json({ city });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCity = async (req, res) => {
  try {
    const city = await City.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ city });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCity = async (req, res) => {
  try {
    await City.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "City deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
