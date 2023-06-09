import React, {  useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import  './style.css';

function Login() {

    const history=useNavigate();

    const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [emailError, setEmailError] = useState('');
const [passwordError, setPasswordError] = useState('');


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
  

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:3000/",{
                email,password
            })
            .then(res=>{
                if(res.data==="exist"){

                    validateEmail();
                   validatePassword();
      
                         if (!emailError && !passwordError) {
                       // Proceed with form submission or further actions
                       alert('Logged In !!');
                      }
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
            <form action="POST" onSubmit={(e) => e.preventDefault()}>
            <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-group row"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
            /> {emailError && <div className="error">{emailError}</div>}</div>
          <div className="mb-3">
                    <label>Password</label>
                    <input
                    type="password"
                    className="form-group row"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    onBlur={validatePassword}
                    />
                     {passwordError && <div className="error">{passwordError}</div>}
          </div>
          <br />
          <input type="submit"class="btn btn-primary" onClick={submit} />

            </form>
            <br />
            <p>-----OR-----</p>
            <br />
<script>  
</script>
            <Link to="/signup">New User? Create Accout</Link>
</center>
        </div>

    )
}

export default Login