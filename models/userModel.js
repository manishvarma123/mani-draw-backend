const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, },
    walletBalance: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }

}, {
    timeStamps: true
})


const userModel = mongoose.model("user", userSchema)

module.exports = userModel