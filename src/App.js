/*global chrome*/
import logo from './logo.svg';
import './App.css';
import CheckSecretKey from "./components/CheckSecretKey";
import { MemoryRouter as Router , Routes, Route } from "react-router-dom";
import Password from "./components/Password";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { Provider } from 'react-redux'


function App() {
  return (
    <div className='App'>
  
    <Router>
        <Routes>
          <Route path="/" element={<CheckSecretKey />} />
           <Route path="/VerifyPassword" element={<Password />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    
    </div>
  );
}
export default App;
