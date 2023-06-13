const mongoose= require("mongoose")

const newSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpass:{
        type:String,
        required:true
    }
})

const collection = mongoose.model("collections",newSchema)



module.exports=collection
