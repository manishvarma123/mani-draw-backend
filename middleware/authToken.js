const jwt = require('jsonwebtoken')

async function authToken(req,res,next){
    try{
        const token = req.headers.authorization?.split(" ")[1]; // Extract token from the Bearer scheme

        console.log("token",token)
        if(!token){
            return res.status(401).json({
                message : "Please Login...!",
                error : true,
                success : false
            })
        }

        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            console.log(err)
            console.log("decoded",decoded)
            
            if(err){
                console.log("error auth", err)
            }

            req.userId = decoded?.id
            console.log("userId",req.userId)
            next()
        });


    }catch(err){
        res.status(400).json({
            message : err.message || err,
            data : [],
            error : true,
            success : false
        })
    }
}


module.exports = authToken