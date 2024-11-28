import React, { useEffect, useState } from 'react';
import Coursebox from './components/coursebox';
import './studenthomepage.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Insightsbar from './components/Insightsbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Studenthomepage(){

    const [courses, setCourses] = useState([]);
    const [enrolledCourses,setEnrolledCourses]=useState([]);
    const navigate=useNavigate()
    const[error,setError]=useState("")

    const [loading, setLoading] = useState(true);
    let studentname=localStorage.getItem('user')
    const setting={
        dots:true,
        infinite:true,
        speed:500,
        slidesToShow:3,
        slidesToScroll:1
    };
    const handleSubmit=(course)=>{
        navigate(`/courses/${course}` ,{ replace: true });

    }

    useEffect(() => {
        const fetchAllCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8000/enroll/getCourses', {
                    withCredentials: true,
                    
                  });
                    
                    const data=response.data
                    
                    setCourses(data);
               
            } catch (error) {
                console.error('Error fetching courses:', error);
                setError(error.message)
            } finally {
                setLoading(false);
            }
        };



        //FETCHING ONLY THE ENROLLED COURSES

        const fetchEnrolledCourses = async () => {
           
            try {
                const response = await axios.get('http://localhost:8000/enroll/getEnrolledCourses', {
                    withCredentials: true,
                    
                  });
                
                    const data=response.data
                    
                    setEnrolledCourses(data);
                
            } catch (error) {
                console.error('Error fetching  the enrolled courses:', error);
                setError(error.message)
            } finally {
                setLoading(false);
            }
        };

        fetchAllCourses();
        fetchEnrolledCourses()
    }, []);

    //POST REQUEST TO ENROLL IN A COURSE


    const enrollInCourse = async (coursename) => {
                try { 
                    console.log(coursename,studentname)
                    const response = await axios.post('http://localhost:8000/enroll/enrollcourse/', {
                        studentname,
                        coursename});
                        setEnrolledCourses((prev) => [...prev, coursename]);
                        setCourses((prevCourses) => prevCourses.filter((course) => course !== coursename));

                        
                   
                } catch (error) {
                    setError(error.message)
                    console.error('Error enrolling in course:', error);
                    
                }
            };
        
    return(
        
            <div className='studentbackground'>
                <div className='featuredcoursearea'>
                    <p className='featuredcoursetext'>Featured Courses</p>
                    {loading ? (
                        <p>Loading courses...</p>
                    ) : courses.length > 0 ? ( // Check if courses array is non-empty
                        <Slider {...setting}>
                            {courses.map((course) => (
                                <div key={course} className="course-container">
                                    <Coursebox course={course} />
                                    <button
                                        className="feature-my-course-button"
                                        onClick={() => enrollInCourse(course)}
                                    >
                                        Enroll
                                    </button>
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <p>No featured courses available at the moment.</p> // Handle empty courses case
                    )}
                </div>
    
                <div className='yourcoursearea'>
                    <p className='featuredcoursetext'>Your Courses</p>
                    {loading ? (
                        <p>Loading courses...</p>
                    ) : enrolledCourses.length > 0 ? ( // Check if enrolledCourses array is non-empty
                        <Slider {...setting}>
                            {enrolledCourses.map((course) => (
                                <div key={course} className="course-container">
                                    <Coursebox course={course} />
                                    <button
                                        className="feature-my-course-button"
                                        onClick={() => handleSubmit(course)}
                                    >
                                        Continue
                                    </button>
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <p>You are not enrolled in any courses yet.</p> // Handle empty enrolledCourses case
                    )}
                </div>
                {error && <p>{error}</p>}
    
                <Insightsbar />
                <div className='askforhelp'>Ask for help</div>
            </div>
        );
};

export default Studenthomepage;
