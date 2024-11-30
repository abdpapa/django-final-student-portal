from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Subjects,Courses
# Create your views here.

# views.py
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
#from django.contrib.auth import authenticate, login
from django.shortcuts import redirect
from rest_framework.response import Response
from . models import Courses,TestEntry
from authentication.models import Teacher
@csrf_exempt
@api_view(['GET'])
def get_courses(request):
    
    try:
     teacher = Teacher.objects.get(username=request.user.username)
     courses = teacher.courses
     
     courses_list = list(courses)
   
     return Response(courses_list)
    except Teacher.DoesNotExist:
         return Response("not a teacher")
@csrf_exempt
@api_view(['GET'])
def get_subjects(request):
    coursename = request.GET.get('course')
  
    course = Courses.objects.get(name=coursename)
   
    subjects=course.subjects
    sublist=list(subjects)
    return Response(sublist)
@csrf_exempt
@api_view(['GET'])
def get_chapters(request):

    # Query all courses
    subject = request.GET.get('subject')
  
    sub = Subjects.objects.get(name=subject)
    
    chapters=sub.chapters
    chaplist=list(chapters)
    return Response(chaplist)

@csrf_exempt
@api_view(['POST'])
def Add_test(request):
   
    data = json.loads(request.body)
    quiz = data['quiz']  # Incoming quiz object
    course = data['course']
    subject = data['subject']
    chapter = data['chapter']

    try:
        # Fetch the existing TestEntry
        #SUB_ID AND CHAP_ID ARE ACTUALLY THERE NAMES
        test_entry = TestEntry.objects.get(coursename=course, sub_id=subject, chap_id=chapter)

        
        quizzes = test_entry.quizzes
        if not isinstance(quizzes, list):
            quizzes = []  # If not a list, reset it

        # Add the new quiz to the quizzes list
        # Quiz.objects.create(
        #     quiz=quiz  
        # )
        quizzes.append(quiz)
        test_entry.quizzes = quizzes
        test_entry.save()

        return JsonResponse({'message': 'Quiz added to existing TestEntry'}, status=200)

    except TestEntry.DoesNotExist:
        # If no TestEntry exists, create a new one
        TestEntry.objects.create(
            coursename=course,
            sub_id=subject,
            chap_id=chapter,
            quizzes=[quiz]  # Wrap the quiz in a list
        )
        # Quiz.objects.create(
        #     quiz=quiz  
        # )
        return JsonResponse({'message': 'New TestEntry created with quiz'}, status=201)

    except Exception as e:
        # Handle unexpected errors
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@api_view(['GET'])
def get_quizzes(request):

    # Query all courses
    course = request.GET.get('course')
    subject = request.GET.get('subject')
    chapter= request.GET.get('chapter')
    try:
      test_entry = TestEntry.objects.get(coursename=course, sub_id=subject, chap_id=chapter)
    
      return Response(test_entry.quizzes)

    except TestEntry.DoesNotExist:
        return Response('No current quiz')
    
@csrf_exempt
@api_view(['GET'])
def getTotalQuizCount(request, courseName):
    """
    View to get the total quiz count for all TestEntry objects related to a given courseName.
    """
    print("qqema")
    if not courseName:
        # Return a bad request error if no courseName is provided
        return JsonResponse({'error': 'courseName is required'}, status=400)

    try:
        # Filter TestEntry objects by courseName
        test_entries = TestEntry.objects.filter(coursename=courseName)

        if not test_entries:
            # If no entries are found for the given courseName, return a not found error
            return JsonResponse({'error': 'No entries found for the given courseName'}, status=404)
        
        # Calculate the total quiz count by summing the quiz counts for all entries
        total_quiz_count = sum(len(entry.quizzes) for entry in test_entries)

        # Return the total quiz count as a JSON response
        return JsonResponse({'total_quiz_count': total_quiz_count})

    except Exception as e:
        # Catch any unexpected errors and return an internal server error
        return JsonResponse({'error': str(e)}, status=500)
