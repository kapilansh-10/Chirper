const mongoose = require("mongoose");
const User = require("./User");

const Schema = mongoose.Schema;

const ChirpSchema = new Schema({
    text: {
        type: String,
        required: true,
        maxLength: 280,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }]
},{timestamps: true}) 

const Chirp = mongoose.model("Chirp",ChirpSchema)

module.exports = Chirp;