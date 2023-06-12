import React , { useContext} from "react"
import {useLocation,useNavigate} from 'react-router-dom'
import  './style.css';
import { AuthContext } from "../auth/Authcontext";

function Home (){
    const location = useLocation()
    const history = useNavigate()
    const email = location.state.id
    const username = email.substring(0, email.indexOf('@'));
    const getAge = () => {
        return Math.floor(Math.random() * 80) + 1; // Generates a random age between 1 and 80
      };
    
      const getDOB = () => {
        const randomDay = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0'); // Generates a random day between 1 and 28
        const randomMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0'); // Generates a random month between 1 and 12
        const randomYear = String(Math.floor(Math.random() * (2003 - 1960 + 1)) + 1960); // Generates a random year between 1940 and 2003
    
        return `${randomDay}-${randomMonth}-${randomYear}`;
      };
    
      const getMobileNumber = () => {
        const randomNumber = String(Math.floor(Math.random() * 9000000000) + 1000000000); // Generates a random 10-digit mobile number
        const formattedNumber = `${randomNumber.substring(0, 3)}-${randomNumber.substring(3, 6)}-${randomNumber.substring(6)}`;
        return formattedNumber;
      };

      const {logout} = useContext(AuthContext);

      async function handleLogout() {
       await logout();
       alert('"User has been logged out !!')
        history('/')
      };
    
      const age = getAge();
      const dob = getDOB();
      const mobileNumber = getMobileNumber();

    return (
        <div className="homepage">
<br /><br />
&nbsp;&nbsp;&nbsp;&nbsp;<h1>Hello {username} !!</h1>
             <center>
             <h2> Profile </h2>
             <div class="card" style={{ width: '18rem' }}>
            <div class="card-header">
               Name: {username}
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Email : &nbsp; {email}</li>
                <li class="list-group-item">Age : &nbsp; {age} </li>
                <li class="list-group-item">DOB : &nbsp; {dob}</li>
                <li class="list-group-item">Mobile : &nbsp; {mobileNumber}</li>
            </ul>
            </div>
            </center>
           
            <button onClick={handleLogout} class="btn btn-primary">Logout</button>
        </div>
    )
}



export default Home