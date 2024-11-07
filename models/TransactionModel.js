// models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['game', 'lucky_draw', 'task'], required: true }, // Type of transaction
  amount: { type: Number, required: true },  // Positive or negative based on gain/loss
  status: { type: String, enum: ['win', 'loss', 'reward', 'entry'], required: true }, // Outcome of transaction
  createdAt: { type: Date, default: Date.now }
});

const transactionModel = mongoose.model("transaction",transactionSchema)

module.exports = transactionModel
