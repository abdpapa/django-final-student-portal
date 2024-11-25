import React from 'react'
import Quiz from 'react-quiz-component';
import { quiz } from './quizlist.js';
const Createquiz = () => {


    const setQuizResult = (obj) => {
        console.log(obj);
        // YOUR LOGIC GOES HERE
      }
  return (
    <div>
      
      <Quiz quiz={quiz} onComplete={setQuizResult}/>
    </div>
  )
}

export default Createquiz
