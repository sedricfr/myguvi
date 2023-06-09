import React, {  useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"


function Login() {

    const history=useNavigate();

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:3000/",{
                email,password
            })
            .then(res=>{
                if(res.data==="exist"){

                    history("/home",{state:{id:email}})
                }
                else if(res.data==="notexist"){

                    alert("User have not sign up")
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
<br />
<br />
            <h1>Login</h1>
            <br /><br />
            <form action="POST">
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
          <br />
          <input type="submit"class="btn btn-primary" onClick={submit} />

            </form>
            <br />
            <p>-----OR-----</p>
            <br />

            <Link to="/signup">New User? Create Accout</Link>
</center>
        </div>

    )
}

export default Login