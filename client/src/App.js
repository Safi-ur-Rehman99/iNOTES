import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './components/Footer';
import NoteState from './context/notes/NoteState';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatePresence, motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } }
};

function AnimatedRoutes({ showAlert }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <Routes location={location}>
          <Route path="/" element={<Home showAlert={showAlert} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/signup" element={<Signup showAlert={showAlert} />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const showAlert = (msg, type) => {
    switch (type) {
      case 'success':
        toast.success(msg);
        break;
      case 'danger':
        toast.error(msg);
        break;
      case 'warning':
        toast.warn(msg);
        break;
      case 'info':
        toast.info(msg);
        break;
      default:
        toast(msg);
    }
  };

  return (
    <>
    <NoteState showAlert={showAlert}>
    <Router>
      <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="dark"
          toastStyle={{ borderRadius: '12px' }}
        />
        <div className="container" style={{ flex: 1 }}>
          <AnimatedRoutes showAlert={showAlert} />
        </div>
        <Footer />
      </div>
    </Router>
   </NoteState>
    </>
  );
}

export default App;
