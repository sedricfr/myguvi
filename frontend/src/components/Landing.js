import React from "react"
import  './style.css';

function Landing() {
return (
    <div className="landpage">
        
    <div className="container">
      <div className="image">
        <img
          src="logo192.png"
          alt="Logo"
          className="logo-image "
        />
      </div>

      <div className="text">
        <h2>JCMERN [ MongoDB Express React NodeJS CRUD System ]</h2>
      </div>
      
      <div className="sbt">
        <a className="btn btn-primary" href="/login" role="button">
          Experience it !!
        </a>
      </div>
    </div>
   
    
    <div>
      <img
        src="https://www.rlogical.com/wp-content/uploads/2020/12/MERN-Stack-considered-the-Best-for-Developing-Web-Apps.png"
        alt="alternatetext"
      />
    </div>



    </div>
)
}

export default Landing