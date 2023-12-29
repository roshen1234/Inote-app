import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const[credentials,setCredentials]=useState({name:"",email:"",password:""})
    let navigate = useNavigate()
    const handleSubmit=async(e)=>{
     e.preventDefault()
     const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}),
    });
    const json=await response.json();
    console.log(json)
    if(json.success)
    {
      // localStorage.setItem("token",json.authtoken)
      console.log(json.authtoken)
      navigate("/login")
    }
    else{
        alert("couldnot create user")
    }
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="mb-3 my-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">Enter your name</div>
  </div>
  <div className="mb-3 my-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">Enter your email address</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name="password"/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Signup