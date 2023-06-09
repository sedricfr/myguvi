const express = require("express")
const mongoose= require("mongoose")
const collection = require("./mongo")
const uri ="mongodb+srv://vcai:votechain%402023@clustervcai.rdtq9yy.mongodb.net/react-login-tut?retryWrites=true&w=majority";

const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())



app.get("/",cors(),(req,res)=>{

})


app.post("/",async(req,res)=>{
    const{email,password}=req.body

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }

})



app.post("/signup",async(req,res)=>{
    const{name,email,password,cpass}=req.body

    const data={
        name:name,
        email:email,
        password:password,
        cpass:cpass
    }

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await collection.insertMany([data])
        }

    }
    catch(e){
        res.json("fail")
    }

})


async function connect() {
    try {
      await mongoose.connect(uri);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error(error);
    }
  }

  connect();
app.listen(3000,()=>{
    console.log("port connected");
})

