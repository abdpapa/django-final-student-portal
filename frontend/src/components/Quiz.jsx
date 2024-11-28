// // THE QUIZ THAT STUDENT SEES!

import React, { useEffect, useState } from "react";
import Quiz from "react-quiz-component";
import { replace, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick"; // Import react-slick slider
import "slick-carousel/slick/slick.css"; // Slider CSS
import "slick-carousel/slick/slick-theme.css";
import "./Quiz.css"; // Import your custom CSS for styling

const CreateQuiz = () => {
  const { course, subject, chapter } = useParams();
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]); // Store multiple quizzes
  const [loading, setLoading] = useState(true);
  const[error,setError]=useState("");
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/taketest/getQuizzes",
          {
            withCredentials: true,
            params: { course, subject, chapter },
          }
        );

        if (response.data.error) {
          console.error("Error fetching quizzes:", response.data.error);
        } else {
          setQuizzes(response.data.quizzes || []); // Store all quizzes
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setError("Error fetching quizzes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [course, subject, chapter]);

  const setQuizResult = async(obj) => {
    
    try{
    const response=axios.post("http://localhost:8000/taketest/addScore/",{obj:obj,course:course,subject:subject,chapter:chapter,studentname:localStorage.getItem('user')})
    }
    catch(error){
        setError(error.message)
    }
  };

  const handleClick = (course) => {
    navigate(`/courses/${course}` ,{ replace: true });
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (quizzes.length === 0) {
    return <div>No quizzes available.</div>;
  }

  return (
    <>
    <div className="quiz-app">
      <Slider {...sliderSettings}>
        {quizzes.map((quiz, index) => {
          
          return(
          <div key={index} className="quiz-container">
            <Quiz quiz={quiz} timer={60} enableProgressBar={true} allowPauseTimer={true}  onComplete={setQuizResult} />
          </div>)
          
        }
        )}
      </Slider>
    
    </div>
     <button className="butt" onClick={() => handleClick(course)}>Go back to courses</button>
     </>
  );
};

export default CreateQuiz;

