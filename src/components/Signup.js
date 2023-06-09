import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import  './style.css';


function Login() {
    const history=useNavigate();

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [cpass,setcpass]=useState('')
    const [name, setname] = useState("")


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
            <form action="POST">

            <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-group row"
              placeholder="First name"
              onChange={(e) => setname(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-group row"
              placeholder="Email"
              onChange={(e) => { setEmail(e.target.value) }}
            /> </div>
          <div className="mb-3">
                    <label>Password</label>
                    <input
                    type="password"
                    className="form-group row"
                    placeholder="Password"
                    onChange={(e) => { setPassword(e.target.value) }}
                    />
          </div>
          <div className="mb-3">
                    <label>Confirm Password</label>
                    <input
                    type="password"
                    className="form-group row"
                    placeholder="Confirm Password"
                    onChange={(e) => { setcpass(e.target.value) }}
                    />
          </div>

          <br /><br />
                <input type="submit"class="btn btn-primary" onClick={submit} />

            </form>
            </center>
            

        </div>
    )
}

export default Login