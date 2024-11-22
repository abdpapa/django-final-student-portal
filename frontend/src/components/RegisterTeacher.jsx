import React from 'react'
import { useState } from 'react';
//import axiosInstance from './axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterTeacher = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:8000/auth/teacherregister/', {
                username,
                email,
                password,
              });
            if (response.data.status==="success"){
                navigate('/login');
            }
            else{
                alert("some problem occured")
            }
              
         

             
        }
        catch(err){
            console.log(err)
        }
       
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Register</button>
        </form>
    );
}



export default RegisterTeacher
