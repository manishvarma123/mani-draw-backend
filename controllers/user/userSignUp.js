const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userSignUpController = async (req,res) => {
    try{
        const {name,email,password,phone} = req.body

        const user = await userModel.findOne({email})

        console.log("user",user)

        if(user){
            throw new Error("User Already Exist")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password,salt)

        if(!hashPassword){
            throw new Error("Something is wrong")
        }

        const payload = {
            ...req.body,
            role : "GENERAL",
            password : hashPassword,
            walletBalance: 500 // Initial bonus coins
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        const token = jwt.sign({id: saveUser._id, email: saveUser.email}, process.env.JWT_SECRET,{expiresIn: '30d'})

        res.status(201).json({
            data : {
                name : saveUser.name,
                email : saveUser.email,
                phone : saveUser.phone,
                role : saveUser.role,
                walletBalance : saveUser.walletBalance,
                createdAt : saveUser.createdAt
            },
            token,
            success : true,
            error: false,
            message : "User created Successfully!"
        })
    }catch(err) {
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = userSignUpController;