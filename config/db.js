const mongoose=require('mongoose')
const connectiondb=async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/lms')
        console.log('server is connected for teacher')
    } catch (error) {
        console.log('server is not connented')
    }
}
module.exports=connectiondb