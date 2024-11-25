import React from 'react'
import { useParams } from 'react-router-dom';

const CourseDetails = () => {


    const { cname } = useParams();
  return (
    <div>
            <form>
            {/* <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" /> */}
            <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default CourseDetails
