const luckydrawModel = require("../../models/LuckyDraw");
const transactionModel = require("../../models/TransactionModel");
const userModel = require("../../models/userModel");



const joinLuckyDrawController = async (req, res) => {
    try {
        const { userId, drawId } = req.body;
        const now = new Date();

        //Fetch the user and draw
        const user = await userModel.findById(userId);
        const luckyDraw = await luckydrawModel.findById(drawId)

        if (!user || !luckyDraw) {
            return res.status(404).json({ message: 'User or Draw not found' });
        }

        // Check if the user has already joined the draw
        const alreadyJoined = luckyDraw.participants.some(
            (participant) => participant.userId.toString() === userId
        );

        const contestStartTime = new Date(luckyDraw.contestStartTime);
        const winnerAnnounceTime = new Date(luckyDraw.winnerAnnounceTime);
        const upcomingJoined = contestStartTime > now;
        const completedJoined = winnerAnnounceTime < now;

        if (upcomingJoined) {
            return res.status(400).json({ message: 'The contest yet not started' });
        } else if (completedJoined) {
            return res.status(400).json({ message: 'Contest has already completed' });
        } else if (alreadyJoined) {
            return res.status(400).json({ message: 'You have already joined this contest' });
        }


        if (user.walletBalance < luckyDraw.entryFee) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        //Deduct the entry fee and join the draw
        user.walletBalance -= luckyDraw.entryFee;
        await user.save();

        luckyDraw.participants.push({ userId: user._id });
        await luckyDraw.save();

        // Create a transaction entry
        const transaction = new transactionModel({
            userId : user._id,
            type: 'lucky_draw',
            amount : -luckyDraw.entryFee,  //Entry fee is a deduction
            status : 'entry' // Status for participating in a draw
        })

        await transaction.save();

        res.status(200).json({
            message: 'Joined successfully',
            walletBalance: user.walletBalance,
        })

    } catch (err) {
        res.status(500).json({
            message: err.message || 'Error joining lucky draw',
            error: true,
            success: false
        })
    }
}


module.exports = joinLuckyDrawController

