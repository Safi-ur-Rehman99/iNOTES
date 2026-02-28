import React from 'react'
import { Link, useLocation ,useNavigate} from 'react-router-dom'
import { motion } from 'framer-motion'

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const HandleLogout=()=>{
    localStorage.removeItem("token");
    navigate("/login");
    
  }

  return (
    <motion.nav
      className="navbar navbar-expand-lg"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="fa-solid fa-note-sticky" style={{ marginRight: '8px', fontSize: '1.2rem', WebkitTextFillColor: 'initial', color: '#FFD700' }} />
          iNOTES
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
            </li>
          </ul>
          {localStorage.getItem("token") ? (
            <div className="d-flex ms-auto" role="group">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link className="btn btn-outline-primary mx-1" to="/login" role="button" onClick={HandleLogout}>
                  <i className="fa-solid fa-right-from-bracket" style={{ marginRight: '6px', WebkitTextFillColor: 'initial' }} />Logout
                </Link>
              </motion.div>
            </div>
          ) : (
            <div className="d-flex ms-auto" role="group" style={{ gap: '0.5rem' }}>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link className="btn btn-outline-primary" to="/login" role="button">Login</Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link className="btn btn-primary" to="/signup" role="button">Sign Up</Link>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
