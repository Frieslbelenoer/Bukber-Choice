import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
    return (
        <div className="loading-container">
            <div className="stars">
                <div className="star s1"></div>
                <div className="star s2"></div>
                <div className="star s3"></div>
                <div className="star s4"></div>
                <div className="star s5"></div>
            </div>

            <div className="lantern-string">
                <div className="lantern-body"></div>
            </div>

            <div className="moon-container">
                <div className="moon"></div>
            </div>

            <h1 className="loading-title">Bukber Choice</h1>
            <p className="loading-subtitle">Selamat Berpuasa</p>
        </div>
    );
};

export default LoadingScreen;
