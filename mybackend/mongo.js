const mongoose= require("mongoose")

const uri ="mongodb+srv://<username>:votechain%402023@<cluster-name>.frbqx.mongodb.net/react-login-tut?retryWrites=true&w=majority";
// mongoose.connect(uri)
// .then(()=>{
//     console.log("mongodb connected");
// })
// .catch(()=>{
//     console.log('failed'); 

// })


// mongoose.connect("mongodb://0.0.0.0:27017/react-login-tut")
// .then(()=>{
//     console.log("mongodb connected");
// })
// .catch(()=>{
//     console.log('failed');
// })


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

const collection = mongoose.model("collection",newSchema)



module.exports=collection
