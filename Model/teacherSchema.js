const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true ,unique:true},
    password: { type: String, required: true }, 
    role:String,
    image: String
});

module.exports = mongoose.model("Teacher", schema);
