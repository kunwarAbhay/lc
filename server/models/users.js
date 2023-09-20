const { Schema, default: mongoose } = require("mongoose");


const usersSchema = new Schema({
    countryName: String,
    school: String,
    aboutMe: String,
    countryCode: String,
    currentGlobalRanking: {
        type: Number,
        min: 1,
    },
    currentRating: {
        type: Number,
        min: 1,
        required: true
    },
    githubUrl: String,

    ranking: {
        type: Number,
        min: 1
    },
    realName: String,
    skillsTags: String,
    userAvatar: String,
    username: {
        type: String,
        required: true
    },
    websites: String,
    linkedinUrl: String,
}
)

module.exports = mongoose.model('users', usersSchema, "users")
