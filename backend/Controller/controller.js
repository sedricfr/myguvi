const userModel = require("../mongo");
var session = require("express-session");
const { MongoClient } = require("mongodb");
const uri ="mongodb+srv://vcai:votechain%402023@clustervcai.rdtq9yy.mongodb.net?retryWrites=true&w=majority";
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

//==================> Create user <=======================
const register = async (req, res) => {
  try {
    let Body = req.body;
    const { name ,email, password, cpass } = Body;

    if (!Body.name) {
      return res.status(400).json("Please enter username");
    }

    const dublicateName = await userModel.findOne({ name: name });
    if (dublicateName) {
      return res.status(400).json(" Email Already Exists");
    }

    //==================> Email validation <=======================
    if (!Body.email) {
      return res.status(400).json("Please enter email");
    }
    const Emailregx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let Email = Emailregx.test(Body.email);
    if (!Email) {
      return res.status(400).json("Please enter valid email.");
    }

    //<===================
    const dublicateEmail = await userModel.findOne({ email: email });
    if (dublicateEmail) {
      return res.status(400).json(" Email Already Exists");
    }
    
   

    //==================> password validation <=======================
    if (!Body.password) {
      return res.status(400).json("Please enter password");
    }
    const Passregx =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%&]).{6,}$/;
    let Password = Passregx.test(Body.password);
    if (!Password) {
      return res
        .status(400)
        .json(
          "Password must have atleast 1 uppercase\n, 1 lowercase, 1 special charecter\n 1 number and must consist atleast 6 characters."
        );
    }

    if (!Body.cpass) {
      return res.status(400).json("Please re-enter password");
    }
    const cPassregx =Body.password
    let cnf= (cPassregx === Body.password);
    if (!cnf) {
      return res
        .status(400)
        .json(
          "Password must have atleast 1 uppercase\n, 1 lowercase, 1 special charecter\n 1 number and must consist atleast 6 characters."
        );
    }

    //const salt = await bcrypt.genSalt(10);
    //req.body.password = await bcrypt.hash(req.body.password, salt);

    let savedData = await userModel.create(Body);
    res.status(201).send({ data: savedData });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

//==================> Login user <=======================

const loginUser = async function (req, res) {
  try {
    let Body = req.body;
    const { email, password } = Body;
    
    if (!email) {
      return res.status(400).json("Please enter email address");
    }
    
    if (!password) {
      return res.status(400).json("Please enter password");
    }
    
    let getUser = await userModel.findOne({  email });
    if (!getUser) return res.status(401).json("Email or Password is incorrect.");
    
   // let matchPassword = await bcrypt.compare(password, getUser.password);
    let matchPassword = (password === getUser.password);
    if (!matchPassword) return res.status(401).json("Email or Password is incorrect.");
    
    // 
    /* token
    
    const token = jwt.sign(
      {
        userId: getUser._id.toString(),
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
      );
      const { newPassword, ...other } = getUser
      let User = getUser
      
      res.cookie("access_token", token, 
      {
        httpOnly: true,
      }).status(200).json({User, token}); */
     
      return res.status(200).send({ data: getUser });
      // req.session.userId = getUser._id.toString();
      // return res.redirect('/home');
      
    } catch (error) {
      return res.status(500).json(error.message);
    }
};

//==================> Logout user <=======================
const logout = (req, res) => {
    res.status(200).json( "User has been logged out. ")
    
};

const homer = (req, res) => {
  const User = req.data;
 /* const name  = User.name.toString() ;
  const email = User.email.toString() ;

  const response = {name,email};  */
  
//   async function run() {

//   const
//   const client = new MongoClient(uri);
//   await client.connect();
//   const dbName = "react-login-tut";
//   const collectionName = "employs";

//   // Create references to the database and collection in order to run
//   // operations on them.
//   const database = client.db(dbName);
//   const collection = database.collection(collectionName);
//   const findOneQuery = { _id: userId};
//     const findOneResult = await collection.findOne(findOneQuery);
//     if (findOneResult === null) {
//       console.log("Couldn't find any recipes that contain 'potato' as an ingredient.\n");
//     } else {
//       console.log(`Found a account with ${_id} `);
//       name = findOneResult.name;
//       email = findOneResult.email;
//     }
// }
  return res.status(200).send({ data: User });

};


module.exports = { register, loginUser, logout,homer };

/*

 //==================> Phone validation <=======================
 if (!Body.phone) {
    return res.status(400).json("Please enter phone number");
  }
  const Phoneregx = /^[0-9]{10}$/;
  let Phone = Phoneregx.test(Body.phone);
  if (!Phone) {
    return res.status(400).json("Please enter valid Phone number.");
  }

  //<===================
  const dublicatePhone = await userModel.findOne({ phone });
  if (dublicatePhone) {
    return res.status(400).json(" Number Already Exists");
  }
//==================> Update user <=======================
const updateUser = async (req,res) => {
    try {
      let body = req.body
      
        const updatedUser = await userModel.updateOne({_id: req.params.id}, {$set : body})
        return res.status(200).json(updatedUser)
    } catch (error) {
        return res.status(500).json(error.message);
    }
}


//==================> Delete user <=======================
const deleteUser = async (req,res) => {
    try {
        
      const deletedUser = await userModel.deleteOne({_id : req.params.id})
      return res.status(200).json(deletedUser)
      
    } catch (error) {
        return res.status(500).json(error.message);
    }
}*/

