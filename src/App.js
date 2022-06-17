import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/NavBar';
import { Home } from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import { useState } from 'react';

function App() {
  const [alert, setalert] = useState(null);
  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type:type
    })
    setTimeout(() => {
      setalert(null);
    },2000)
  }

  return (
    <>
      <NoteState>
      <Router>
          <Navbar showAlert={showAlert}/> 
          <Alert alert={alert}/>
          <div className="container">
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert} />}> </Route>
          <Route exact path="/about" element={<About />}> </Route>
          <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}> </Route>
          <Route exact path="/login" element={<Login showAlert={showAlert}/>}> </Route>
            </Routes>
            </div>
        </Router>
        </NoteState>
    </>
  );
}

export default App;