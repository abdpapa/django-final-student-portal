from django.shortcuts import render
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from testapp.models import Courses,Subjects,TestEntry
from rest_framework.response import Response
from django.http import JsonResponse
import json
from .models import TestScores
@csrf_exempt
@api_view(['GET'])
def getSubjects(request):
  try:
    coursename=request.GET.get('cname')
   
    courseobj=Courses.objects.get(name=coursename)
    
    subs=courseobj.subjects
    sublist = []

    for sub in subs:
     subobj = Subjects.objects.filter(name=sub)
     for obj in subobj:
        sublist.append({
            
            "name": obj.name,
            "chaps": obj.chapters,  # Add other fields as needed
        })
    return Response(sublist)

  except Exception as e:
    print(e)
    return Response("some error occurred")
  

@csrf_exempt
@api_view(['GET'])
def getChapters(request):
 try:
    coursename=request.GET.get('cname')
    print(coursename)
    courseobj=Subjects.objects.get(name=coursename)
   
    subs=courseobj.chapters
    return Response(subs)

 except Exception as e:
    print(e)
    return Response("some error occurred")
 
@csrf_exempt
@api_view(['GET'])
# def getQuizzes(request):
#  try:
#     coursename=request.GET.get('course')
#     subject=request.GET.get('subject')
#     chapter=request.GET.get('chapter')
    
#     #SUB_ID AND CHAP_ID ARE ACTUALLY THERE NAMES
#     entry=TestEntry.objects.get(coursename=coursename,sub_id=subject,chap_id=chapter)
#     quiz=entry.quizzes
#     formatted_quiz = {
#     "quizTitle": quiz[0].get("quizTitle", ""),  # Default to empty string
#     "quizSynopsis": quiz[0].get("quizSynopsis", ""),
#     "progressBarColor": quiz[0].get("progressBarColor", ""),
#     "nrOfQuestions": quiz[0].get("nrOfQuestions", 0),  # Default to 0
#     "questions": [
#         {
#             "question": q.get("question", ""),  # Default to empty question
#             "questionType": q.get("questionType", "text"),  # Default to "text"
#             "questionPic": q.get("questionPic", ""),  # Default to empty string
#             "answerSelectionType": q.get("answerSelectionType", "single"),  # Default to "single"
#             "answers": q.get("answers", []),  # Default to empty list
#             "correctAnswer": q.get("correctAnswer", ""),  # Default to empty
#             "messageForCorrectAnswer": q.get("messageForCorrectAnswer", "Correct!"),
#             "messageForIncorrectAnswer": q.get("messageForIncorrectAnswer", "Incorrect!"),
#             "explanation": q.get("explanation", ""),
#             "point": q.get("point", 0),  # Default to 0
#         }
#         for q in quiz[0].get("questions", [])  # Ensure "questions" is a list
#     ],
# }
#     return JsonResponse(formatted_quiz)

#  except Exception as e:
#     print(e)
#     return Response("some error occurred")


def getQuizzes(request):
    try:
        coursename = request.GET.get('course')
        subject = request.GET.get('subject')
        chapter = request.GET.get('chapter')

        # Fetch the TestEntry object based on the parameters
        entry = TestEntry.objects.get(
            coursename=coursename, sub_id=subject, chap_id=chapter
        )

        # Format the quizzes data
        formatted_quizzes = [
            {
                "quizTitle": quiz.get("quizTitle", ""),
                "quizSynopsis": quiz.get("quizSynopsis", ""),
                "progressBarColor": quiz.get("progressBarColor", ""),
                "nrOfQuestions": quiz.get("nrOfQuestions", 0),
                "questions": [
                    {
                        "question": q.get("question", ""),
                        "questionType": q.get("questionType", "text"),
                        "questionPic": q.get("questionPic", ""),
                        "answerSelectionType": q.get("answerSelectionType", "single"),
                        "answers": q.get("answers", []),
                        "correctAnswer": q.get("correctAnswer", ""),
                        "messageForCorrectAnswer": q.get(
                            "messageForCorrectAnswer", "Correct!"
                        ),
                        "messageForIncorrectAnswer": q.get(
                            "messageForIncorrectAnswer", "Incorrect!"
                        ),
                        "explanation": q.get("explanation", ""),
                        "point": q.get("point", 0),
                    }
                    for q in quiz.get("questions", [])
                ],
            }
            for quiz in entry.quizzes  # Loop through all quizzes
        ]

        return JsonResponse({"quizzes": formatted_quizzes})

    except Exception as e:
        print(e)
        return JsonResponse({"error": "Some error occurred"})


@csrf_exempt
@api_view(['POST'])
def AddTestScores(request):
    try:
        data = json.loads(request.body)

        obj=data.get('obj')
        questions=obj['questions']
        studentname=data.get('studentname')
        course=data.get('course')
        subject=data.get('subject')
        chapter=data.get('chapter')
        score=obj['correctPoints']

        
        if TestScores.objects.filter(studentname=studentname,coursename=course,subjectname=subject,chapname=chapter,quizuniqueidenitiy=questions).exists():
            testobj=TestScores.objects.get(studentname=studentname,coursename=course,subjectname=subject,chapname=chapter,quizuniqueidenitiy=questions)
            testobj.points=score
            testobj.save()
            return JsonResponse({"success": "new attemp complete"})
            
        TestScores.objects.create(
            studentname=studentname,
            coursename=course,
            subjectname=subject,
            chapname=chapter,
            quizuniqueidenitiy=obj['questions'],
            points=score
        )
        return Response("success")
   
    except Exception as e:
        print(e)
        return JsonResponse({"error": "Some error occurred"})

@csrf_exempt
@api_view(['GET'])
def getStudentQuizCount(request, studentName):
    """
    View to get the total count of TestScores related to a given studentName.
    """
    # Retrieve all TestScores related to the studentName
    test_scores = TestScores.objects.filter(studentname=studentName)
    
    # Count the number of TestScores entries for that student
    quiz_count = test_scores.count()
    
    # Return the count as a JSON response
    return JsonResponse({'student': studentName, 'quiz_count': quiz_count})
