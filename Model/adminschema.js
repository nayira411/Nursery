const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: String,
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type :String}
});

module.exports = mongoose.model("Child", schema);
