import React from 'react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: 'fa-solid fa-cloud',
    title: 'Cloud Storage',
    description: 'Your notes are securely stored in the cloud and accessible from anywhere, anytime.'
  },
  {
    icon: 'fa-solid fa-lock',
    title: 'Secure & Private',
    description: 'End-to-end authentication ensures your notes stay private and protected.'
  },
  {
    icon: 'fa-solid fa-bolt',
    title: 'Lightning Fast',
    description: 'Built with modern technologies for instant note creation, editing, and retrieval.'
  },
  {
    icon: 'fa-solid fa-tags',
    title: 'Smart Tags',
    description: 'Organize your notes with custom tags for easy categorization and search.'
  },
  {
    icon: 'fa-solid fa-mobile-screen',
    title: 'Responsive Design',
    description: 'Seamless experience across desktop, tablet, and mobile devices.'
  },
  {
    icon: 'fa-solid fa-code',
    title: 'Modern Stack',
    description: 'Powered by React, Node.js, Express, and MongoDB for reliability and speed.'
  }
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  })
}

const About = () => {
  return (
    <div className="about-page">
      <motion.div
        className="about-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-gradient-gold">About iNOTES</h1>
        <p>
          iNOTES is a modern, cloud-based notes application designed to help you capture,
          organize, and access your thoughts from anywhere. Simple, secure, and beautifully crafted.
        </p>
      </motion.div>

      <div className="feature-grid">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="feature-card"
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="show"
          >
            <div className="feature-icon">
              <i className={feature.icon} />
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default About
