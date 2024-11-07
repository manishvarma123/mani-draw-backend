const { default: mongoose } = require("mongoose");

const LuckyDrawSchema = new mongoose.Schema({
    name : {type:String, required:true, trim:true},
    prizeAmount : {type:Number, required:true},
    entryFee : {type:Number, required:true},
    participants : [
        {
            userId:{type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
            joinedAt:{type:Date, default:Date.now}
        }
    ],
    winners : [
        {
            userId:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
            prizeAmount:{type:Number},
            awardedAt:{type:Date,default:Date.now}
        }
    ],
    contestStartTime: {type:Date,required:true},
    winnerAnnounceTime: {type:Date,required:true},
    status: {type:String,enum:['upcoming','ongoing','completed'],default:'upcoming'},
    createdAt: {type:Date,default:Date.now}
});

const luckydrawModel = mongoose.model("LuckyDraw",LuckyDrawSchema);

module.exports = luckydrawModel