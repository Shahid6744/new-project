const express=require('express')
const router=express.Router()
const signupvalidate=require('../middleware/signupmiddleware')
const validatelogin=require('../middleware/signupmiddleware')
const {signupController}=require('../Controller/teacherController')
const {loginController}=require('../Controller/teacherController')
router.post('/signup',signupvalidate,signupController)
router.post('/login',validatelogin,loginController)
module.exports=router