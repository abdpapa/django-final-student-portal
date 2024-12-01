
//REGISTER A TEACHER
import React from 'react'
import { useState } from 'react';
//import axiosInstance from './axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './registerteacher.css'
const RegisterTeacher = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[courses,setCourses]=useState([]);
    const[error,setError]=useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(courses)
        try{
            const response = await axios.post('http://localhost:8000/auth/teacherregister/', {
                username,
                email,
                password,
                courses
              });
            if (response.data.status==="success"){
                navigate('/login',{ replace: true });
            }
            else{
                alert("some problem occured")
            }
              
         

             
        }
        catch(err){
            console.log(err)
            setError(err.message)
        }
       
    };

    return (
        <div className='register-teacher-page'>
            <div className='register-teacher-form-area'>
                <form onSubmit={handleSubmit} className='register-teacher-form'>
                    <p>Username</p>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                    <p>Email</p>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <p>Password</p>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <div className='checkbox-area'>
                        <h4>Select Courses:</h4>
                        <div className='single-checkbox'>
                            <input
                                type="checkbox"
                                value="SAT"
                                onChange={(e) =>
                                    setCourses((prev) => (prev.includes(e.target.value) ? prev : [...prev, e.target.value]))
                                }
                            />
                            <p>SAT</p>
                        </div>
                        <div className='single-checkbox'>
                            <input
                                type="checkbox"
                                value="NAT"
                                onChange={(e) =>
                                    setCourses((prev) => (prev.includes(e.target.value) ? prev : [...prev, e.target.value]))
                                }
                            />
                            <p>NAT</p>
                        </div>
                        <div className='single-checkbox'>
                            <input
                                type="checkbox"
                                value="NET"
                                onChange={(e) =>
                                    setCourses((prev) => (prev.includes(e.target.value) ? prev : [...prev, e.target.value]))
                                }
                            />
                            <p>NET</p>
                        </div>
                    </div>
                    <button type="submit">Register</button>
                    {error && <p>{error}</p>}
                </form>
            </div>
            <div className='register-text-area'>
                <p>
                Your journey
                <br />
                Towards teaching
                <br />
                Starts here!
                </p>  
            </div>
        </div>
    );
}



export default RegisterTeacher
