const mongoose=require('mongoose')
const studentSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    age:{type:Number},
    img:{type:String},
    department:{
        type:String,
    },
    degree:{type:String},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    addedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    isDeleted:{type:Boolean,default:false}
    // password:{
    //     type:String,
    //     required:true
    // },
    
})
module.exports=mongoose.model('student',studentSchema)