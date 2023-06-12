import React, { useContext, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import  './style.css';
import { AuthContext } from "../auth/Authcontext";

function Login() {

    const history=useNavigate();
    const {login} = useContext(AuthContext);

    const [input, setInputs] = useState({
      email: "",
      password: "",
    });
    const [isInputValid, setInputValid] = useState(false);
    const [err, setError] = useState(null);
   
/*

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
  }; */
  const handleChange = (e) => {
  setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  
  const { email, password } = input;
  setInputValid(email.trim().length > 0 && password.trim().length > 0);
  };

    async function submit(e){
        e.preventDefault();

        try{
              
              await login(input)
              history('/home')
              
          }
      catch(err)
      {
                alert("wrong details")
                console.log(err);
                setError(err.response.data);
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
            <input required
              type="email"
              className="form-group row"
              placeholder="Email"
              onChange={handleChange}
            /> </div>
          <div className="mb-3">
                    <label>Password</label>
                    <input required
                    type="password"
                    className="form-group row"
                    placeholder="Password"
                    onChange={handleChange}
                    />
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