import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Chatbot from "./components/Chatbot";
import TeamPage from "./components/Team";
import Navbar from "./components/Navbar";

function App() {
  useEffect(() => {   
    const response = fetch('https://engagelytics.onrender.com/');
    console.log(response);
   
  }, [])
  
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/team" element={<TeamPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
