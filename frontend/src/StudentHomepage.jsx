import React, { useEffect, useState } from 'react';
import Coursebox from './components/coursebox';
import './studenthomepage.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Insightsbar from './components/Insightsbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // New Navbar component

function Studenthomepage() {
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    let studentname = localStorage.getItem('user');

    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    

    const handleSubmit = (course) => {
        navigate(`/courses/${course}`, { replace: true });
    };

    useEffect(() => {
        const fetchAllCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8000/enroll/getCourses', {
                    withCredentials: true,
                });
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchEnrolledCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8000/enroll/getEnrolledCourses', {
                    withCredentials: true,
                });
                setEnrolledCourses(response.data);
            } catch (error) {
                console.error('Error fetching enrolled courses:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllCourses();
        fetchEnrolledCourses();
    }, []);

    const enrollInCourse = async (coursename) => {
        try {
            const response = await axios.post('http://localhost:8000/enroll/enrollcourse/', {
                studentname,
                coursename,
            });
            setEnrolledCourses((prev) => [...prev, coursename]);
            setCourses((prevCourses) => prevCourses.filter((course) => course !== coursename));
        } catch (error) {
            setError(error.message);
            console.error('Error enrolling in course:', error);
        }
    };

    return (
        <div className="studentbackground">
            <Navbar /> {/* Added Navbar */}
            
            {/* Featured Courses */}
            <div className="featuredcoursearea">
                <p className="featuredcoursetext">Featured Courses</p>
                {loading ? (
                    <p>Loading courses...</p>
                ) : courses.length > 0 ? (
                    <Slider {...sliderSettings}>
                        {courses.map((course) => (
                            <div key={course} className="course-container">
                                <Coursebox course={course} />
                                <button
                                    className="feature-my-course-button"
                                    onClick={() => enrollInCourse(course)}
                                >
                                    Start
                                </button>
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <p>No featured courses available at the moment.</p>
                )}
            </div>

            {/* Enrolled Courses */}
            <div className="yourcoursearea">
                <p className="featuredcoursetext">Your Courses</p>
                {loading ? (
                    <p>Loading courses...</p>
                ) : enrolledCourses.length > 0 ? (
                    <Slider {...sliderSettings}>
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
                    <p>You are not enrolled in any courses yet.</p>
                )}
            </div>
            
            {/* Insights Section */}
            <div className="insights-container">
                <div className="insight-box">
                    <div className="circular-progress">40%</div>
                    <p>Correct Answers</p>
                    <button className="details-button">Details</button>
                </div>
                <div className="insight-box">
                    <div className="circular-progress">46%</div>
                    <p>Overall Performance</p>
                    <button className="details-button">Details</button>
                </div>
            </div>
            
            <div className="askforhelp">
                <button className = "ask-for-help-button">Ask for Help</button>
            </div>
        </div>
    );
}

export default Studenthomepage;
