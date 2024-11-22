// LoginComponent.jsx
import { useState } from 'react';
//import axiosInstance from './axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function LoginComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


//CODE FOR ACCESING ENDPOINTS WITH TOKEN
//     const token = localStorage.getItem('access_token');
// const response = await axios.get('http://localhost:8000/secure-endpoint/', {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:8000/auth/studentlogin/', {
                username,
                password,
              });
              const { access_token, refresh_token } = response.data;

              console.log('Access Token:', access_token);
              console.log('Refresh Token:', refresh_token);
              localStorage.setItem('access_token', access_token);
              localStorage.setItem('refresh_token', refresh_token);
            if (response.data.status==="success"){
                navigate('/home');
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
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginComponent;

