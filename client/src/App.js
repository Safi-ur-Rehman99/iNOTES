import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteState from './context/notes/NoteState';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <div className='container'>
    <Router>
      <div className="App">
        <Navbar />
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="colored"
          toastStyle={{ borderRadius: '10px' }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/signup" element={<Signup showAlert={showAlert} />} />
        </Routes>
      </div>
    </Router>
    </div>
   </NoteState>
    </>
  );
}

export default App;
