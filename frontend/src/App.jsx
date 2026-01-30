import React from 'react'
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdvisoryDashboard from './pages/AdvisoryDashboard';

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={<AdvisoryDashboard />} />
        </Routes>
    )
}

export default App;