import React from 'react';
import './navbar.css';

function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-item">
                <i className="fas fa-home"></i>
                Home
            </div>
            <div className="navbar-item">
                <i className="fas fa-cogs"></i>
                Settings
            </div>
            <div className="navbar-item">
                <i className="fas fa-chart-bar"></i>
                Progress
            </div>
            <div className="navbar-item">
                <i className="fas fa-book"></i>
                ImageHolder
            </div>
            <div className="navbar-item">
                <input type="text" placeholder="Browse Courses" />
            </div>
            <button className="logout-button">Log Out</button>
        </div>
    );
}

export default Navbar;
