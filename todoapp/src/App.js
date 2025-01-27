import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Viewtask from './components/Viewtask';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/viewtask" element={<Viewtask/>}></Route>


      </Routes>
      </BrowserRouter>
   </div>
  );
}

export default App;
