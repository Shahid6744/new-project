const mongoose=require('mongoose')
const bcrypt =require('bcrypt')
const teacherSchema=new mongoose.Schema({
    name:{
        type:String
        
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['Student','Teacher','Admin'],
        default:'Teacher'
    },
    status:{
        type:String,
       enum:['active','block'],
       default:'active'
    },
    
    password:{type:String,required:true}
})
teacherSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()
        this.password = await bcrypt.hash(this.password, 10)
})

teacherSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)
}
module.exports=mongoose.model('User',teacherSchema)
