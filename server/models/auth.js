const { Schema, default: mongoose } = require("mongoose");

const authSchema = new Schema({
    uid: String,
    created: {
        type: Date,
        default: Date.now,
    },
    modified: {
        type: Date,
        default: Date.now,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: [true, "Email address already in use"],
        required: [true, 'Email address is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    username: {
        type: String,
        trim: true,
        required: "Username is required"
    },
    password: String,
    friends:{
        type:[String]
    }
}
)

module.exports = mongoose.model('authSchema', authSchema, "authUsers")
