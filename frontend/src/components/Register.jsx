//REGISTER A STUDENT
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function RegisterComponent() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[error,setError]=useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:8000/auth/studentregister/', {
                username,
                email,
                password,
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
            setError(error.message)
        }
       
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Register</button>
            {error && <p>{error}</p>}
        </form>
    );
}

export default RegisterComponent;

