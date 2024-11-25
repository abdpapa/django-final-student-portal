import React, { useEffect, useState } from 'react';
import Coursebox from './components/coursebox';
import './studenthomepage.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Insightsbar from './components/Insightsbar';
import axios from 'axios';

function Studenthomepage() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    //const [studentID] = useState(1); //is jagah studentID change karni he
    let studentname=localStorage.getItem('user')


    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8000/enroll/getCourses', {
                    withCredentials: true,
                    
                  });
                //if (response.ok) {
                   // const data = await response.json();
                    const data=response.data
                    
                    setCourses(data);
                // } else {
                //     console.error('Failed to fetch courses:', response.statusText);
                // }
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const enrollInCourse = async (coursename) => {
        try { 
            console.log(coursename,studentname)
            const response = await axios.post('http://localhost:8000/enroll/enrollcourse/', {
                studentname,
                coursename}, {withCredentials: true});
                // method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                // body: JSON.stringify({ studentname, coursename }),

            

            //const data = reponse;
            if (response.ok) {
                alert(`Enrollment successful:`);
            } else {
                alert(`Enrollment failed`);
            }
        } catch (error) {
            console.error('Error enrolling in course:', error);
            alert('An error occurred while enrolling in the course.');
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    return (
        <div className='studentbackground'>
            <div className='featuredcoursearea'>
                <p className='featuredcoursetext'>Featured Courses</p>
                {loading ? (
                    <p>Loading courses...</p>
                ) : (
                    <Slider {...settings}>
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
                )}
            </div>

            <div className='yourcoursearea'>
                <p className='featuredcoursetext'>Your Courses</p>
                <Slider {...settings}>
                    <div className="course-container">
                        <Coursebox />
                        <button className="feature-my-course-button">Continue</button>
                    </div>
                </Slider>
            </div>

            <Insightsbar />
            <div className='askforhelp'>Ask for help</div>
        </div>
    );
}

export default Studenthomepage;
