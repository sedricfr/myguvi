const express = require("express")
const mongoose= require("mongoose")
const MONGO_CONNECTION ="mongodb+srv://vcai:votechain%402023@clustervcai.rdtq9yy.mongodb.net/react-login-tut?retryWrites=true&w=majority";
const port = process.env.PORT || 3000;
const route = require ("./router/router")
const cors = require("cors")
const app = express()
app.use(express.json())

app.use(cors({ origin:'https://tubular-cheesecake-ac28b9.netlify.app'}))

mongoose.connect(MONGO_CONNECTION,{useNewUrlParser:true})
.then(()=>{
    console.log("Connected MongoDB Successfully !!")
}).catch(err=>{
    console.log(err.message);
})

app.use("/",route)


app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });

