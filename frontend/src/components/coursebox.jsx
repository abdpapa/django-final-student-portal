import React from 'react';
import './coursebox.css'; // Add styles as needed

function Coursebox( {course} ) {
    if (!course) {
        return null; // Handle empty course gracefully
    }

    return (
        <div className='coursebox'>
            <h5>{course}</h5>
        </div>
    );
}

export default Coursebox;
