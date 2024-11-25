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
     # Query all courses
    print('in')
    try:
    # enrollobj = EnrollTable.objects.get(studentname=request.studentname)
     print(request.user)
     #studentname=request.GET.get('studentname')
     
     student=Student.objects.get(username=request.user.username)
     courses=student.courses
    
    # Convert the queryset to a list of dictionaries containing only the 'name' field
     courses_list = list(courses)
     
    # Return the list of courses as a JSON response using DRF's Response
     return Response(courses_list)
    except Student.DoesNotExist:
        return Response('Student doesnt exist')
       

@csrf_exempt
@api_view(['POST'])
def EnrollStudentCourse(request):
    if request.method == 'POST':
        print('hi')
        try:
            data = json.loads(request.body)

            studentname = data.get('studentname')
            coursename = data.get('coursename')

            if not studentname or not coursename:
                return JsonResponse({'status': 'error', 'message': 'studentID and courseID missing'}, status=404)

            try:
                student = Student.objects.get(username=studentname)
                print("student is "+student)
            except Student.DoesNotExist:
                return JsonResponse({'status': 'error', 'message': 'this student does not exist'}, status=404)
            

            # try:
            #     course = Courses.objects.get(name=coursename)
            # except Courses.DoesNotExist:
            #     return JsonResponse({'status': 'error', 'message': 'this course does not exist'}, status=404)
            

            if EnrollTable.objects.filter(studentname = studentname, coursename= coursename).exists():
                return JsonResponse({'status': 'error', 'message': 'Student is already enrolled in this course'}, status=400)
            EnrollTable.objects.create(student = studentname, course = coursename)


            student.courses.append(coursename)

            return JsonResponse({'status': 'success', 'message': 'Enrollment was successful'}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'invalid json data'}, status=404)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': 'error in last of enroll view'}, status=404)

    return JsonResponse({'status': 'error', 'message': 'not a POST type of request'}, status=404)