const { Schema, default: mongoose } = require("mongoose");


const contestSchema = new Schema({
    score:Number,
    rank: {
        type: Number,
        min: 1,
        unique:true
    },
    username: {
        type: String,
        required: true,
        unique:true
    },
}
)

module.exports = mongoose.model('contest', contestSchema, "contest-ranking")
