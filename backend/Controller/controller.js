const userModel = require("../mongo");

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
    
   
    let matchPassword = (password === getUser.password);
    if (!matchPassword) return res.status(401).json("Email or Password is incorrect.");
    
      return res.status(200).send({ data: getUser });
      
      
    } catch (error) {
      return res.status(500).json(error.message);
    }
};

//==================> Logout user <=======================
const logout = (req, res) => {
    res.status(200).json( "User has been logged out. ")
    
};


module.exports = { register, loginUser, logout };

