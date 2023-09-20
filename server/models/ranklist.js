const { Schema, default: mongoose } = require("mongoose");

const ranklistSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    rank : {
        type : Number,
        required : true
    },
    score : {
        type : Number,
        required : true
    },
    countryName: String,
    countryCode: String,
})

module.exports = mongoose.model('ranklist', ranklistSchema, "ranklist")