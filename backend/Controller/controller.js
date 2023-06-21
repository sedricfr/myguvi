const userModel = require("../mongo");
const userproModel = require("../mongo_bio");

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
      return res.status(400).json(" Name Already Exists");
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

   

    let savedData = await userModel.create(Body);
    res.status(201).send({ data: savedData });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};




//==================> Edit user profile <=======================


const editProfile = async (req, res) => {
  try {
    let Body = req.body;
    const { name , email,age,dob,mobile} = Body;

     //==================> NAME validation <=======================
    if (!Body.name) {
      return res.status(400).json("Please enter username");
    }

    // const dublicateName = await userproModel.findOne({ name: name });
    // if (dublicateName) {
    //   return res.status(400).json(" Name Already Exists");
    // }

    //==================> Email validation <=======================
    if (!Body.email) {
      return res.status(400).json("Please enter email");
    }
    const Emailregx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let Email = Emailregx.test(Body.email);
    if (!Email) {
      return res.status(400).json("Please enter valid email.");
    }
    
    
    //<=================== AGE Validation <==============================
    const ageregx = /^[0-9]{1,}$/;
    let AGE  = ageregx.test(Body.mobile);
    if (!AGE) {
      return res.status(400).json("Please enter your age");
    }

    //==================> dob validation <=======================
    const dobregx = /^[0-9][0-9]-[0-9][0-9]-[0-9][0-9][0-9][0-9]$/;
    let DOB  = dobregx.test(Body.dob);
    if (!DOB) {
      return res.status(400).json("Please enter DOB");
    }

    //==================> Mobile validation <=======================
     const mobileregx = /^[0-9]{10}$/;
    let Mobile  = mobileregx.test(Body.mobile);
    if (!Mobile) {
      return res.status(400).json("Please enter Mobile");
    }

    const id = Body.id
    let duplicateUser = await userproModel.findOne({ id });
    let getUser ;
    if( !duplicateUser )
    {  
      
      let savedData = await userproModel.create(Body);
      getUser = await userproModel.findOne({ id });
    }
    else
    {
      const findOneQuery = { id: id };
      const updateOptions = { returnOriginal: false };
      const updateDoc = { $set: { name : name ,  email: email , age:age , dob:dob , mobile: mobile } };
      const updateResult = await userproModel.findOneAndUpdate(
              findOneQuery,
              updateDoc,
              updateOptions,
            );
    console.log(`Here is the updated document:\n${JSON.stringify(duplicateUser.value)}\n`);
      getUser = await userproModel.findOne({ id });
    }
    res.status(201).send({ data: getUser });
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
    
   
    let matchPassword = (password === getUser.password);
    if (!matchPassword) return res.status(401).json("Email or Password is incorrect.");
    
      return res.status(200).send({ data: getUser });
      
      
    } catch (error) {
      return res.status(500).json(error.message);
    }
};

//==================> Fetch user Bio <=======================

const fetchUserbio = async function (req, res) {
  try {
    // let Body = req.body;
    const userId = req.params.userId;
  //  const userId = Body._id;
   const id = userId;
    
    let getUser = await userproModel.findOne({ id });
    if (!getUser) 
    { return res.status(401).json("Please Edit info first , No user edited data found !!");}
    else
    {
      return res.status(200).send({ data: getUser });
    }
  
    } catch (error) {
      return res.status(500).json(error.message);
    }
};

//==================> Logout user <=======================
const logout = (req, res) => {
    res.status(200).json( "User has been logged out. ")
    
};

module.exports = { register, loginUser, logout ,editProfile ,fetchUserbio};

