import React from 'react'

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="container">
        <span className="footer-brand">iNOTES</span>
        <p>&copy; {new Date().getFullYear()} iNOTES. Built with care — your notes, secured in the cloud.</p>
      </div>
    </footer>
  )
}

export default Footer
