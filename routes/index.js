const userSignInController = require('../controllers/user/userSignIn')

const userDetails = require('../controllers/user/userDetails')
const authToken = require('../middleware/authToken')

const express = require('express')
const userSignUpController = require('../controllers/user/userSignUp')
const joinLuckyDrawController = require('../controllers/luckydraw/joinLuckyDraw')
const getLuckyDrawController = require('../controllers/luckydraw/getLuckyDraw')



const router = express.Router()

router.post('/signup',userSignUpController)
router.post('/signin',userSignInController)
router.get("/user-details",authToken,userDetails)


router.post('/join-draw',authToken,joinLuckyDrawController)
router.get('/get-luckydraw',getLuckyDrawController)


module.exports = router;