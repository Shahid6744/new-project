const Student=require('../Models/addStudents')
const transporter = require('../config/mailer');
const User=require('../Models/userModel')
exports.addStudent=async(req,res)=>{
    try {
        const {name, email, password, department, degree}=req.body
         if(!req.file){
        return res.status(400).send({message:'image is required'})
        }
        const user=new User({
            email,
            role:'Student',
            password,
        })
        await user.save()
        const newage=Number(req.body.age)
        const imgUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        const students=new Student({
            name,
            email,
            age:newage,
            img:imgUrl ,
            department,
            degree,
            addedBy:req.user.id,
            userId:user._id,
        })
       
        await students.save()
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to:email,
            subject:'You have add the student',
            html:`
            <h2>WelCome ${name || 'student'}</h2>
            <p>You have been Added to the System</p>
            <p>Email :${email}</p>
            <p>Age :${newage}</p>
            <p><a href="${imgUrl}">View</a></p>
            <p>Department :${department}</p>
            <p>degree :${degree}</p>
            <p>Password :${password}</p>
            `
        })
        res.status(201).send({
            message:'student is added',
            student:students
        })
    } catch (error) {
        console.error('error',error)
        res.status(500).send({message:'student is not added'})
    }
}

exports.getProfile=async(req,res)=>{
    try {
        const profile=await Student.findOne({userId:req.user.id}).populate('addedBy','name')
        if(!profile){
          return  res.status(404).send({message:'student profile is not found'})
        }
       return res.status(200).send({
            message:'Student Profile is fetched',
            profile,
        })
    } catch (error) {
        console.log(error)
      return  res.status(500).send({message:'internal error'})
    }
}


exports.getStudent=async(req,res)=>{
    try {
        const {page=1,limit=3}=req.query
        const addedBy=req.user.id
        if(!addedBy){
           return res.status(400).send({message:'userId is required'})
        }
        const pageNumber=parseInt(page)
        const pageLimit=parseInt(limit)
        const skip=(pageNumber-1)*pageLimit
        const filter = { addedBy, isDeleted: false }; 
        const totalStudents = await Student.countDocuments(filter);
        const students = await Student.find(filter).skip(skip).limit(pageLimit);
        res.status(200).send({
            message:'student data is fetched',
            students,
            totalStudents
        })
    } catch (error) {
        res.status(500).send({message:'internal error'})
    }
}

exports.userDelete=async(req,res)=>{
    try {
        const studentId=req.params.id
        console.log(studentId)
        const student=await Student.findById(studentId)
        if(!student){
          return  res.status(404).send({message:'student not found'})
        }
       await Student.findByIdAndUpdate(studentId, {isDeleted:true}, {new:true});
        res.status(200).send({message:'student is deleted successfully'})
    } catch (error) {
        res.status(500).send({message:'internal error'})
    }
}
exports.editUser=async(req,res)=>{
    try {
        const addedBy=req.params.id
        const student=await Student.findById(addedBy )
        if(!student){
            res.status(404).send({message:'student not found'})
        }
        res.status(200).send({
            message:'student is fetched',
            student,
        })
    } catch (error) {
        res.status(500).send({message:'internal error'})
    }
}

exports.updateUser=async(req,res)=>{
     try {
        const studentId=req.params.id
        const data={...req.body}
        const addedBy=req.user.id
        if(data.age) data.age=Number(data.age)
        Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);
        if(req.file){
            data.img=`${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
        }
        const students=await Student.findOneAndUpdate({_id:studentId,addedBy,isDeleted:false}, data,{new:true})
        if(!students){
           return res.status(404).send({message:'student is not found'})
        }
        res.status(200).send({
            message:'student updated successfully',
            students,
        })
     } catch (error) {
        res.status(500).send({message:'internal error'})
     }
}