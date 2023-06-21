const mongoose= require("mongoose")

const newSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    }
    
})

const collection = mongoose.model("profile",newSchema)



module.exports=collection
