function signupvalidate(req,res,next){
  const {email,password}=req.body
  if(!email ||!password){
    return res.send('email and password is required')
  }
  next()
}
function validatelogin(req,res,next){
    const {email,password}=req.body
    if(!email || !password){
      return  res.send('email and password required')
    }
    next()
}
module.exports=signupvalidate,validatelogin