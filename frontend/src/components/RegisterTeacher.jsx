import React from 'react'
import { useState } from 'react';
//import axiosInstance from './axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterTeacher = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[courses,setCourses]=useState([]);
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
             <div>
                <h4>Select Courses:</h4>
                <label>
                    <input
                        type="checkbox"
                        value="SAT"
                        onChange={(e) =>
                            setCourses((prev) => (prev.includes(e.target.value) ? prev : [...prev, e.target.value]))
                        }
                    />
                    SAT
                </label>
                <br />
                <label>
                    <input
                        type="checkbox"
                        value="NAT"
                        onChange={(e) =>
                            setCourses((prev) => (prev.includes(e.target.value) ? prev : [...prev, e.target.value]))
                        }
                    />
                    NAT
                </label>
                <br />
                <label>
                    <input
                        type="checkbox"
                        value="NET"
                        onChange={(e) =>
                            setCourses((prev) => (prev.includes(e.target.value) ? prev : [...prev, e.target.value]))
                        }
                    />
                    NET
                </label>
            </div> 

            <button type="submit">Register</button>
        </form>
    );
}



export default RegisterTeacher
