// LoginComponent.jsx
import { useState } from 'react';
//import axiosInstance from './axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useStor } from '../data/storeuser';
//import { useStore } from 'zustand';
//import { useStor } from '../data/storeuser';
function LoginComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {current_user,is_student,setuser,setUserStatus}=useStor()


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
                password},
                {withCredentials: true}
                
              );
              const {usernames,is_student} = response.data;

              localStorage.setItem('user', usernames);
              localStorage.setItem('is_student', is_student);

            //   console.log('Access Token:', access_token);
            //   console.log('Refresh Token:', refresh_token);
            //   localStorage.setItem('access_token', access_token);
            //   localStorage.setItem('refresh_token', refresh_token);
          
           // console.log(usernames)
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

