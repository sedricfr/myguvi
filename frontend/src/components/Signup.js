import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import  './style.css';


function Signup() {
    const history=useNavigate();
    const [inputs, setInputs] = useState({
      name: "",
      email: "",
      password: "",
      cpass: ""
    });
    const [err, setError] = useState(null);

    const handleChange = (e) => {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
/*
    const validateName = () => {
        if (name.trim() === '') {
          setNameError('Name is required');
        } else {
          setNameError('');
        }
      };
      
      const validateEmail = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          setEmailError('Invalid email address');
        } else {
          setEmailError('');
        }
      };
      
      const validatePassword = () => {
        if (password.length < 4) {
          setPasswordError('Password must be at least 4 characters long');
        } else {
          setPasswordError('');
        }
      };
      
      const validateConfirmPassword = () => {
        if (cpass !== password) {
          setConfirmPasswordError('Confirm password should match the password');
        } else {
          setConfirmPasswordError('');
        }
      };
*/
    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("https://myguvi-backend.onrender.com/api/user/signup",inputs);
  /*
=======
            await axios.post("https://tubular-cheesecake-ac28b9.netlify.app/signup",{
                name,email,password,cpass
                
            })
            .then(res=>{
>>>>>>> b33d022638d3151e7b48b84d8e400a8706e3a5a0:src/components/Signup.js
                if(res.data==="exist"){
                    alert("User already exists")
                }
                else if(res.data==="notexist"){
                   
                     alert('User Successfully Registered');
                   }*/
                    history('/login');
        }
        catch(e){
            console.log(e);

        }

    }


    return (
        <div className="login">

            <center>
            <br /><br />
            <h1>Signup</h1>
            <br /><br />
            <form action="POST" onSubmit={(e) => e.preventDefault()}>

            <div className="mb-3">
            <label>Name</label>
            <input
            required
              type="text"
              className="form-group row"
              placeholder="First name"
              onChange={handleChange}
            />
            </div>

          <div className="mb-3">
            <label>Email</label>
            <input
            required
              type="email"
              className="form-group row"
              placeholder="Email"
              onChange={handleChange}
            /></div>
          <div className="mb-3">
                    <label>Password</label>
                    <input
                    required
                    type="password"
                    className="form-group row"
                    placeholder="Password"
                    onChange={handleChange}
                    />
                     </div>
          <div className="mb-3">
                    <label>Confirm Password</label>
                    <input
                    required
                    type="password"
                    className="form-group row"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    />     </div>

          <br /><br />
                <input type="submit"class="btn btn-primary" onClick={submit} />

            </form>
            </center>
            

        </div>
    )
}

export default Signup
