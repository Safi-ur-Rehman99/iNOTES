import React, { useState, Suspense, lazy } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const AuthBackground = lazy(() => import('./AuthBackground'))

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const navigate = useNavigate()
    const host=process.env.REACT_APP_API_URL;


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
    <div className="auth-page">
      <Suspense fallback={null}>
        <AuthBackground />
      </Suspense>
      <motion.div
        className="auth-form-wrapper glass-card-gold"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <h2 className="auth-heading text-gradient-gold">Welcome Back</h2>
        <p className="auth-subheading">Sign in to access your notes</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" placeholder="you@example.com" value={credentials.email} onChange={onChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" placeholder="Enter your password" value={credentials.password} onChange={onChange} required />
          </div>
          <motion.button
            type="submit"
            className="btn btn-primary w-100"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ padding: '0.65rem', fontSize: '1rem', fontWeight: 600 }}
          >
            <i className="fa-solid fa-right-to-bracket" style={{ marginRight: '8px' }} />
            Login
          </motion.button>
        </form>
        <p className="auth-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Login
