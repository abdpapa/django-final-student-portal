AddTest.jsx



//THE PAGE WHERE TEACHER ADDS TEST


import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Quiz from 'react-quiz-component';
import axios from 'axios';
import './rohaan.css'
import Navbar from './Navbar';
const AddTest = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const course = queryParams.get('course');
    const subject = queryParams.get('subject');
    const chapter = queryParams.get('chapter');
    const navigate=useNavigate()
    
    

 

  const [quiz, setQuiz] = useState({
    quizTitle: "",
    quizSynopsis: "",
    progressBarColor: "",
    nrOfQuestions: "",
    questions: [],
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuiz((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle question addition
  const addQuestion = () => {
    setQuiz((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question: "",
          questionType: "text",
          questionPic: "",
          answerSelectionType: "single",
          answers: [],
          correctAnswer: "",
          messageForCorrectAnswer: "",
          messageForIncorrectAnswer: "",
          explanation: "",
          point: "",
        },
      ],
    }));
  };

  // Handle question field change
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index][field] = value;
    setQuiz((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }));
  };

  // Handle answer addition
  const addAnswer = (questionIndex) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex].answers.push("");
    setQuiz((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }));
  };

  // Handle answer field change
  const handleAnswerChange = (questionIndex, answerIndex, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex].answers[answerIndex] = value;
    setQuiz((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }));
  };

  // Submit the form
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(course)
    try {
        const response = await axios.post(http://localhost:8000/test/AddTest/, {
            quiz,
            course,
            subject,
            chapter,
            withCredentials: true,
        });
      } catch (err) {
        console.error(err);
      }
    console.log("Quiz Object:", quiz);
    alert("Quiz has been created! Check the console for the object.");
  };

  return (
    <>
        <Navbar/>
    <form onSubmit={handleSubmit}>
      <h1>Create a Quiz</h1>
    <div className = "quiz-maker-container">
      <label>
        Quiz Title:
        <input
          type="text"
          name="quizTitle"
          value={quiz.quizTitle}
          onChange={handleChange}
        />
      </label>

      <label>
        Quiz Synopsis:
        <textarea
          name="quizSynopsis"
          value={quiz.quizSynopsis}
          onChange={handleChange}
        />
      </label>

      <label>
        Progress Bar Color:
        <input
          type="text"
          name="progressBarColor"
          value={quiz.progressBarColor}
          onChange={handleChange}
        />
      </label>

      <label>
        Number of Questions:
        <input
          type="number"
          name="nrOfQuestions"
          value={quiz.nrOfQuestions}
          onChange={handleChange}
        />
      </label>
    </div>

      <h2>Questions</h2>
      {quiz.questions.map((question, qIndex) => (
        <div className='teacher-quiz-container-two'>
        <div key={qIndex} style={{ marginBottom: "20px" }}>
          <label>
            Question:
            <input
              type="text"
              value={question.question}
              onChange={(e) =>
                handleQuestionChange(qIndex, "question", e.target.value)
              }
            />
          </label>

          <label>
            Question Type:
            <select
              value={question.questionType}
              onChange={(e) =>
                handleQuestionChange(qIndex, "questionType", e.target.value)
              }
            >
              <option value="text">Text</option>
              <option value="photo">Photo</option>
            </select>
          </label>

          <label>
            Question Picture URL:
            <input
              type="text"
              value={question.questionPic}
              onChange={(e) =>
                handleQuestionChange(qIndex, "questionPic", e.target.value)
              }
            />
          </label>

          <label>
            Answer Selection Type:
            <select
              value={question.answerSelectionType}
              onChange={(e) =>
                handleQuestionChange(qIndex, "answerSelectionType", e.target.value)
              }
            >
              <option value="single">Single</option>
              <option value="multiple">Multiple</option>
            </select>
          </label>

          <label>
            Correct Answer (Index or Array):
            <input
              type="text"
              value={question.correctAnswer}
              onChange={(e) =>
                handleQuestionChange(qIndex, "correctAnswer", e.target.value)
              }
            />
          </label>

          <label>
            Message for Correct Answer:
            <textarea
              value={question.messageForCorrectAnswer}
              onChange={(e) =>
                handleQuestionChange(
                  qIndex,
                  "messageForCorrectAnswer",
                  e.target.value
                )
              }
            />
          </label>

          <label>
            Message for Incorrect Answer:
            <textarea
              value={question.messageForIncorrectAnswer}
              onChange={(e) =>
                handleQuestionChange(
                  qIndex,
                  "messageForIncorrectAnswer",
                  e.target.value
                )
              }
            />
          </label>

          <label>
            Explanation:
            <textarea
              value={question.explanation}
              onChange={(e) =>
                handleQuestionChange(qIndex, "explanation", e.target.value)
              }
            />
          </label>

          <label>
            Points:
            <input
              type="number"
              value={question.point}
              onChange={(e) =>
                handleQuestionChange(qIndex, "point", e.target.value)
              }
            />
          </label>

          <h4>Answers</h4>
          {question.answers.map((answer, aIndex) => (
            <div key={aIndex}>
              <input
                type="text"
                value={answer}
                onChange={(e) =>
                  handleAnswerChange(qIndex, aIndex, e.target.value)
                }
              />
            </div>
          ))}

          <button className = "teacher-quiz-button" type="button" onClick={() => addAnswer(qIndex)}>
            Add Answer
          </button>
        </div>
      </div>
      ))}

      <button className = "teacher-quiz-button" type="button" onClick={addQuestion}>
        Add Question
      </button>

      <button className = "teacher-quiz-button"  type="submit">Submit Quiz</button>
      

    </form>
    </>
  );

}

export default AddTest