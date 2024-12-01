// LoginComponent FOR STUDENT


import './login.css'
import { useState } from 'react';
//import axiosInstance from './axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function LoginTeacher() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const[error,setError]=useState("")
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:8000/auth/teacherlogin/", {
                username,
                password,
              },{ withCredentials: true });
              const {usernames,is_student} = response.data;
              
            if (response.data.status==="success"){
                
                localStorage.setItem('user', usernames);
                localStorage.setItem('is_student', is_student);
                navigate("/teacherHomePage",{ replace: true });
            }
        }
        catch(err){
            
            console.log(err)
            setError(err.message)
        }
       
    };

    return (
        <div className='login-page'>
            <div className='login-text1'>
                <p>
                Your teaching
                <br />
                Journey starts
                <br />
                Right here!
                </p>  
            </div>

            <div className='login-form-area'>
                <div className="login-text2">
                    <h1>Hi there!</h1>
                    <p>Login to continue</p>
                </div>
                <div className='login-area'>
                    <form className='login-area' onSubmit={handleSubmit}>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        <a href="" className='forgot-password'>Forgot Password</a>
                        <button type="submit">Login</button>
                        {error &&<p>{error}</p>}
                        <p>New to PrepMaster?</p>
                        <a href=' 'className='signup-link'>Sign up now!!!</a>
                    </form>
                
                </div>
            </div>
        </div>
    );
}

export default LoginTeacher;

