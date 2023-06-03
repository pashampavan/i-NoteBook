import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {  useState } from 'react';
import NoteState from './context/Notes/NotesState';
function App() {
  const [alert,setAlert]=useState(null);
  const showAlert=(type,msg)=>{
    setAlert({"type":type,"msg":msg});
    setTimeout(()=>{setAlert(null)},1000)
  }
  return (
    <>
    <NoteState>

    <Router>
      <Navbar/>
      
      <div style={{"height":"40px"}}>
          <Alert alert={alert}/>
      </div>

      <div className="container my-5">

        <Switch>
           <Route exact path="/">
             <Home />
           </Route>
           <Route exact path="/about">
             <About />
           </Route>
           <Route exact path="/login">
             <Login showAlert={showAlert}/>
           </Route>
           <Route exact path="/signup">
             <Signup showAlert={showAlert}/>
           </Route>
         </Switch>
      </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
