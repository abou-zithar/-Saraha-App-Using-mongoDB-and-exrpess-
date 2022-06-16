const mongoose = require('mongoose')
const messageSchema = new mongoose.Schema({
    Content: {
        type: String,
        required: true
    },
    SendTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    }
}, {
    timestamps: true
})

const messageModel = mongoose.model('message' , messageSchema)
module.exports = messageModel