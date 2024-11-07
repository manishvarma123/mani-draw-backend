const luckydrawModel = require("../../models/LuckyDraw")


const getLuckyDrawController = async (req,res) => {
    try{
        const luckydraws = await luckydrawModel.find();

        res.status(200).json({
            data : luckydraws,
            success : true,
            error : false,
            message : 'Lucky Draw retrieve successfully'
        })


    }catch(err){
        res.status(400).json({
            message : err.message || 'Server error. Could not retrieve lucky draws.',
            error : true,
            success : false
        })
    }
}

module.exports = getLuckyDrawController