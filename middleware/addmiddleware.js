function addvalidate(req,res,next){
  const {email,password}=req.body
  if(!email ||!password ){
    return res.status(400).send('all fields are required')
  }
  next()
}
module.exports=addvalidate