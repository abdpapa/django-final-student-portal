from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Subjects,Courses,Quiz
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
    # Query all courses
    try:
     teacher = Teacher.objects.get(username=request.user.username)
     courses = teacher.courses
     print(request.user)
    # Convert the queryset to a list of dictionaries containing only the 'name' field
     courses_list = list(courses)
    # Return the list of courses as a JSON response using DRF's Response
     return Response(courses_list)
    except Teacher.DoesNotExist:
         return Response("not a teacher")
@csrf_exempt
@api_view(['GET'])
def get_subjects(request):
    # Query all courses
    coursename = request.GET.get('course')
  
    course = Courses.objects.get(name=coursename)
   
    subjects=course.subjects
    sublist=list(subjects)
    # print(subjectid)
    # sublist=list
    # for subs in subjectid:
    #       sub = Subjects.objects.get(subs)
    #       sublist.append(sub.name)
    # # Return the list of courses as a JSON response using DRF's Response
    # print(sublist)
    return Response(sublist)
@csrf_exempt
@api_view(['GET'])
def get_chapters(request):

    # Query all courses
    subject = request.GET.get('subject')
  
    sub = Subjects.objects.get(name=subject)
    
    chapters=sub.chapters
    chaplist=list(chapters)
    # print(subjectid)
    # sublist=list
    # for subs in subjectid:
    #       sub = Subjects.objects.get(subs)
    #       sublist.append(sub.name)
    # # Return the list of courses as a JSON response using DRF's Response
    # print(sublist)
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
        test_entry = TestEntry.objects.get(coursename=course, sub_id=subject, chap_id=chapter)

        # Ensure quizzes is a list
        quizzes = test_entry.quizzes
        if not isinstance(quizzes, list):
            quizzes = []  # If not a list, reset it

        # Add the new quiz to the quizzes list
        Quiz.objects.create(
            quiz=quiz  # Wrap the quiz in a list
        )
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
        Quiz.objects.create(
            quiz=quiz  # Wrap the quiz in a list
        )
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
    
    
    # print(subjectid)
    # sublist=list
    # for subs in subjectid:
    #       sub = Subjects.objects.get(subs)
    #       sublist.append(sub.name)
    # # Return the list of courses as a JSON response using DRF's Response
    # print(sublist)
    
      return Response(test_entry.quizzes)

    except TestEntry.DoesNotExist:
        return Response('No current quiz')
