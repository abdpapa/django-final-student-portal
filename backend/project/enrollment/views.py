from rest_framework.views import APIView
from rest_framework.response import Response
from .models import  EnrollTable
from testapp.models import Courses
from rest_framework.decorators import api_view
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from authentication.models import Student

@csrf_exempt
@api_view(['GET'])
def getCourses(request):
    courses_list=[]
    courses=[]
     # Query all courses
    
    try:
     
     entries = EnrollTable.objects.filter(studentname=request.user.username)

     for course in entries:
        courses_list.append(course.coursename)
     allcourses = Courses.objects.exclude(name__in=courses_list)
     
     for course in allcourses:
        courses.append(course.name)
        
     return Response(courses)
    except Exception as e:
        print(e)
        return Response('Some error occurred')
    

@csrf_exempt
@api_view(['GET'])
def getEnrolledCourses(request):
     # Query all courses
    
    courselist=[]
    try:
   
     
     enrollobjs = EnrollTable.objects.filter(studentname=request.user.username)
    
     if enrollobjs.exists():
        for objs in enrollobjs:
           print(objs.coursename)
           courselist.append(objs.coursename)
            
        return Response(courselist)

     else:
       print("No enrolled courses")
       return Response("")

    except Exception as e:
        print(e)
        return Response("Some error occurred")
       

@csrf_exempt
@api_view(['POST'])
def EnrollStudentCourse(request):
    if request.method == 'POST':
        
        try:
            data = json.loads(request.body)

            studentname = data.get('studentname')
            coursename = data.get('coursename')

            if not studentname or not coursename:
                return JsonResponse({'status': 'error', 'message': 'studentID and courseID missing'}, status=400)

            try:
               
                student = Student.objects.get(username=studentname)
                
               # print("student is "+student)
            except Student.DoesNotExist:
                
                return JsonResponse({'status': 'error', 'message': 'this student does not exist'}, status=400)
            
            

            if EnrollTable.objects.filter(studentname = studentname, coursename= coursename).exists():
                
                return JsonResponse({'status': 'error', 'message': 'Student is already enrolled in this course'}, status=400)
            EnrollTable.objects.create(studentname = studentname, coursename = coursename)


            #student.courses.append(coursename)

            return JsonResponse({'status': 'success', 'message': 'Enrollment was successful'}, status=201)

        except json.JSONDecodeError:
           
            return JsonResponse({'status': 'error', 'message': 'invalid json data'}, status=400)
        except Exception as e:
            print(e)
            return JsonResponse({'status': 'error', 'message': 'error in last of enroll view'}, status=400)
    
    return JsonResponse({'status': 'error', 'message': 'not a POST type of request'}, status=400)