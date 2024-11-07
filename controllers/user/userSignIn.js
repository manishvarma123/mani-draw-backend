const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSignInController = async (req,res) => {
    try{
        const {email,password} = req.body;

        const user = await userModel.findOne({email})
        if(!user){
            throw new Error("User does not Exists")
        }

        const checkPassword = await bcrypt.compare(password,user.password)

        if(checkPassword){
            const token = jwt.sign({id: user._id, email: user.email},process.env.JWT_SECRET,{expiresIn: '30d'})

            res.status(201).json({
                data : user,
                message : 'Login Successfully',
                token,
                success : true,
                error : false
            })
        }else{
            throw new Error("Please check Password")
        }
    }catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = userSignInController