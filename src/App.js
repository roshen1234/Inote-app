import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
   const[alert,setAlert]=useState(null)
   const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
     })
     setTimeout(()=>{
      setAlert(null)
    },1500)
   }
  //  props.showAlert("converted text to uppercase","success")
  return (
   <>
   <NoteState>
   <Router>
   <Navbar/>
   <Alert alert={alert}/>
   <div className="container">
   <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert}/>}>
          </Route>
          <Route exact path="/about"element={<About/>}>
            </Route>
            <Route exact path="/signup"element={<Signup showAlert={showAlert}/>}>
            </Route>
            <Route exact path="/login"element={<Login showAlert={showAlert}/>}>
            </Route>
    </Routes>
    </div>
  </Router>
  </NoteState>
  </> 
  );
}

export default App;
