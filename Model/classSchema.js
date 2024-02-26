const mongoose=require("mongoose");
const schema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    superVisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teacher"
    },
    children: [{
        type: Number,
    }]
});
module.exports=mongoose.model("class",schema);