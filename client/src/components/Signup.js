import React, { useState, Suspense, lazy } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const AuthBackground = lazy(() => import('./AuthBackground'))

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (credentials.password !== credentials.cpassword) {
      props.showAlert("Passwords do not match", "danger");
      return;
    }

    const host="http://localhost:5000";
    const response=await fetch(`${host}/api/auth/createuser`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(credentials)
    });
    console.log('Signup submitted', credentials)
    const json = await response.json();
    console.log(json.success,json);

    if(json.success){
      localStorage.setItem('token',json.authToken);
      props.showAlert("Account created successfully", "success");
      navigate('/');
    }
    else{
        props.showAlert(json.error || "Signup failed", "danger");
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
        <h2 className="auth-heading text-gradient-gold">Create Account</h2>
        <p className="auth-subheading">Join iNOTES and start organizing your thoughts</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" placeholder="Your full name" value={credentials.name} onChange={onChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" placeholder="you@example.com" value={credentials.email} onChange={onChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" placeholder="Min. 5 characters" value={credentials.password} onChange={onChange} required minLength={5} />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" name="cpassword" placeholder="Re-enter your password" value={credentials.cpassword} onChange={onChange} required minLength={5} />
          </div>
          <motion.button
            type="submit"
            className="btn btn-primary w-100"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ padding: '0.65rem', fontSize: '1rem', fontWeight: 600 }}
          >
            <i className="fa-solid fa-user-plus" style={{ marginRight: '8px' }} />
            Sign Up
          </motion.button>
        </form>
        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Signup
