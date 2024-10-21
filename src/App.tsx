// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SawEscapeRoom from './pages/Saw';
import PiratesEscapeRoom from './pages/Pirates';
import Scenario from './pages/Scenario';
import HomePage from './pages/HomePage';
import Reservation from './pages/Reservation'; 
import Cannibal from './pages/Cannibal';
import Test from './pages/test';  
import Loading from './pages/loading'; // Import your Loading component
import './styles/EscapeRoom.css'; // Keep your CSS styling

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false); // New state for fade out

    const handleLoadingComplete = () => {
        setFadeOut(true); // Trigger fade-out
        setTimeout(() => {
            setIsLoading(false); // Remove loading component after fade-out
        }, 1000); // Duration should match CSS transition
    };

    return (
        <Router>
            {isLoading ? (
                <Loading onComplete={handleLoadingComplete} /> // Pass only the onComplete prop
            ) : (
                <>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/saw" element={<SawEscapeRoom />} />
                        <Route path="/pirates" element={<PiratesEscapeRoom />} />
                        <Route path="/cannibal" element={<Cannibal />} />
                        <Route path="/scenario" element={<Scenario />} />
                        <Route path="/reservation" element={<Reservation />} />
                        <Route path="/test" element={<Test />} />
                    </Routes>
                </>
            )}
        </Router>
    );
};

export default App;
