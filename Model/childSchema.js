const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: Number,
    name: { type: String, required: true,unique:true },
    image: String,
    age:Number,
    level: {
        type: String,
        require: true,
        enum: ["preKG", "KG1", "KG2"]
    },
    address: {
        city: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        building: {
            type: String,
            required: true
        }
    },
    role:String,
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "teacher" }
});

module.exports = mongoose.model("Child", schema);
