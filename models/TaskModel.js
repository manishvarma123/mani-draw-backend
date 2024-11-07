const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    reward: { type: Number, required: true },  //Amount of coin as reward
    type: { type: String, enum: ['registration', 'daily_login', 'custom'], required: true },
    createdAt: { type: Date, default: Date.now }
})

const taskModel = mongoose.model("task", taskSchema)

module.exports = taskModel