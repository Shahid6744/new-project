const jwt=require('jsonwebtoken')
const verifytoken=(req,res,next)=>{
   try {
    const authHeader=req.headers.authorization
    if(!authHeader){
      return  res.status(401).send({message:'Token is missing'})
    }
    
    const token=authHeader.split(' ')[1]
    const decoded=jwt.verify(token,process.env.JWT_KEY)
    req.user=decoded
    next()
} 
catch (error) {
    res.status(401).send({message:'Invalid or expire Token'})
}
}
module.exports=verifytoken
