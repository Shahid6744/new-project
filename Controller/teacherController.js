const User=require('../Models/userModel')
const jwt=require('jsonwebtoken')
exports.signupController=async(req,res)=>{
   try {
    const {name,email,password,role}=req.body
    const teachers=new User({name,email,password, role:role || 'teacher'})
    await teachers.save()
    res.status(201).send({
        message:'signup successfully',
        
    })
   } catch (error) {
    console.error('error',error)
    res.status(500).send({message:'failed to signup'})
   }
}
exports.loginController=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
           return res.status(404).send({message:'wrong credentials'})
        }
        const isMatch=await user.comparePassword(password)
        if(!isMatch){
          res.status(401).send({message:'wrong credentials'})
        }
        const token=jwt.sign(
            {id:user._id,role:user.role},
            process.env.JWT_KEY,
            {expiresIn:'2d'}
        )
       return res.status(200).send({
            message:`${user.role} Login is successfully`,
            token:token,
            role:user.role
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({message:'internal error'})
    }
}

