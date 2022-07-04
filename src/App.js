import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useState} from 'react'
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path = "/" element = {<Login />} />
        <Route exact path = "/login" element = {<Login />} />
        <Route exact path = "/dashboard" element = {<Dashboard />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
