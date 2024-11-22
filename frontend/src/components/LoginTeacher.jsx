// LoginComponent.jsx
import { useState } from 'react';
//import axiosInstance from './axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function LoginTeacher() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:8000/auth/teacherlogin/", {
                username,
                password,
              });
            if (response.data.status==="success"){
                navigate('/home');
            }
            else{
                alert("some problem occured")
            }
              
         

             
        }
        catch(err){
            console.log("errrrror")
            console.log(err)
        }
       
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginTeacher;

