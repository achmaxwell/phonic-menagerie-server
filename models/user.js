const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    rolse: {
        type: String,
        default: 'basic',
        enum: ["basic", "admin"]
    },
    accessToken: {
        type: String
    }
});

const User = mongoose.model('user', UserSchema);

mongoose.model.exports = User;