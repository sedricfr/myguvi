import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import  './style.css';


function Signup() {
    const history=useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpass, setcpass] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

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
        if (password.length < 8) {
          setPasswordError('Password must be at least 8 characters long');
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

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:3000/signup",{
                name,email,password,cpass
                
            })
            .then(res=>{
                if(res.data==="exist"){
                    alert("User already exists")
                }
                else if(res.data==="notexist"){
                   // history("/home",{state:{id:name}})
                   validateName();
                   validateEmail();
                   validatePassword();
                   validateConfirmPassword();
                 
                   if (!nameError && !emailError && !passwordError && !confirmPasswordError) {
                     // Proceed with form submission or further actions
                     alert('User Successfully Registered');
                   }
                    history('/')
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })
            

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
              type="text"
              className="form-group row"
              placeholder="First name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              onBlur={validateName}
            />
            {nameError && <div className="error">{nameError}</div>}
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-group row"
              placeholder="Email"
              onChange={(e) => { setEmail(e.target.value) }}
              value={email}
              onBlur={validateEmail}
            />{emailError && <div className="error">{emailError}</div>}
            </div>
          <div className="mb-3">
                    <label>Password</label>
                    <input
                    type="password"
                    className="form-group row"
                    placeholder="Password"
                    onChange={(e) => { setPassword(e.target.value) }}
                    value={password}
                    onBlur={validatePassword}
                    />
                    {passwordError && <div className="error">{passwordError}</div>}
          </div>
          <div className="mb-3">
                    <label>Confirm Password</label>
                    <input
                    type="password"
                    className="form-group row"
                    placeholder="Confirm Password"
                    onChange={(e) => { setcpass(e.target.value) }}
                    value={cpass}
                    onBlur={validateConfirmPassword}
                    />       {confirmPasswordError && <div className="error">{confirmPasswordError}</div>} 
          </div>

          <br /><br />
                <input type="submit"class="btn btn-primary" onClick={submit} />

            </form>
            </center>
            

        </div>
    )
}

export default Signup