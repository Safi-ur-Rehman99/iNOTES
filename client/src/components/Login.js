import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const navigate = useNavigate()
    const host="http://localhost:5000";


  const handleSubmit =  async (e) => {
    e.preventDefault()
    // TODO: Add login API call here
     const response=await fetch(`${host}/api/auth/login`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(credentials)
    });
    console.log('Login submitted', credentials)
    const json = await response.json();
    console.log(json.success,json);

    if(json.success){
      localStorage.setItem('token',json.authToken);
      props.showAlert("Logged in successfully", "success");
      navigate('/');
    }
    else{
        props.showAlert("Invalid credentials", "danger");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className="mt-3">
      <h2>Login to iNOTES</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}

export default Login
