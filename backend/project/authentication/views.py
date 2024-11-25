# views.py
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login,logout  
from authentication.models import Student,Teacher,TeacherRequest
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User

@csrf_exempt
def loginStudent(request):
    
    if request.method == 'POST':
        if request.user.is_authenticated:
            print("User is already logged in.")
            logout(request)
        try:
            data = json.loads(request.body)
            
            username = data['username']
            ##print(username)
            if  username:
               
                # return JsonResponse({'status': 'error', 'message': 'Username is required'}, status=200)
                password = data.get('password')
                user = authenticate(username=username, password=password)
                
                    # print('not a student')
                    # return JsonResponse({'status': 'error', 'message': 'Invalid credentials'}, status=400)

            
            if user:
                if user.is_student:
                 
                 login(request, user)
                 refresh = RefreshToken.for_user(user)
                 access_token = str(refresh.access_token)

                 return JsonResponse({
                        'status': 'success',
                        'usernames' :user.username,
                        'is_student':user.is_student,
                        'access_token': access_token,
                        'refresh_token': str(refresh),
                        'message': 'Login successful'
                }, status=200)

                else:
                   print('not a student')
                   return JsonResponse({'status': 'error', 'message': 'Invalid credentials'}, status=400)
                
                 
                #return JsonResponse({'status': 'success'}, status=200)
            else:
                return JsonResponse({'status': 'error', 'message': 'Invalid credentials'}, status=400)
        
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON data'}, status=400)
    
    # Handle non-POST requests (like GET) gracefully
   
    return JsonResponse({'status': 'error', 'message': 'Only POST requests are allowed.'}, status=200)


@csrf_exempt
def registerStudent(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
           
            # Extract user data from the request
            username = data.get('username')
            password = data.get('password')
            email = data.get('email')
            
            # Validate required fields
            if not username or not password or not email:
                return JsonResponse({'status': 'error', 'message': 'All fields are required'}, status=400)
            
            # Check if username already exists
            if Student.objects.filter(username=username).exists():
                
                return JsonResponse({'status': 'error', 'message': 'Username already exists'}, status=400)
            
            # Create and save the student
            student = Student.objects.create(
                username=username,
                email=email,
                password=make_password(password),  # Hash the password before saving
                is_student=True,
            )
            print(student)
            
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                is_student=True # Django's create_user automatically hashes the password
            )
            print(user)
            return JsonResponse({'status': 'success', 'message': 'User registered successfully'}, status=201)
        
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON data'}, status=400)
        except Exception as e:
            print(str(e))
            return JsonResponse({'status': 'error', 'message': f'An error occurred: {str(e)}'}, status=500)
    
    return JsonResponse({'status': 'error', 'message': 'Only POST requests are allowed'}, status=400)


#Teacher registeration and login
@csrf_exempt
def loginTeacher(request):
    #print(request.user.username)
    if request.method == 'POST':
        if request.user.is_authenticated:
            print("User is already logged in.")
            logout(request)
        try:
            data = json.loads(request.body)
           
            username = data['username']
           
            if  username:
               
                # return JsonResponse({'status': 'error', 'message': 'Username is required'}, status=200)
                password = data.get('password')
                user = authenticate(username=username, password=password)
                
           
            
            if user:
                if  user.is_student == False:
                 
                 login(request, user)
                 

                #  user_data = {
                # 'username': user.username,
                #  }
                
                 return JsonResponse({'status': 'success','usernames' :user.username,
                        'is_student':user.is_student}, status=200)
            else:
                print('not a teacher')
                return JsonResponse({'status': 'error', 'message': 'Invalid credentials'}, status=400)

            # else:
            #     return JsonResponse({'status': 'error', 'message': 'Invalid credentials'}, status=400)
        
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON data'}, status=400)
    
    # Handle non-POST requests (like GET) gracefully
   
    return JsonResponse({'status': 'error', 'message': 'Only POST requests are allowed.'}, status=200)


@csrf_exempt
def registerTeacher(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
           
            # Extract user data from the request
            username = data.get('username')
            password = data.get('password')
            email = data.get('email')
            courses = data.get('courses')
            
            
            # Validate required fields
            if not username or not password or not email:
                return JsonResponse({'status': 'error', 'message': 'All fields are required'}, status=400)
           
            if TeacherRequest.objects.filter(username=username).exists() or User.objects.filter(username=username).exists():
                return JsonResponse({'status': 'error', 'message': 'Username already exists'}, status=400)
            if TeacherRequest.objects.filter(email=email).exists() or User.objects.filter(email=email).exists():
                return JsonResponse({'status': 'error', 'message': 'Email already exists'}, status=400)
            
            # Save the request in TeacherRequest model
            TeacherRequest.objects.create(
                username=username,
                email=email,
                password=password,
                courses=courses  # Hash the password before saving
            )
            
            return JsonResponse({'status': 'success', 'message': 'Teacher registration request submitted successfully'}, status=201)
            # Check if username already exists
            # if Teacher.objects.filter(username=username).exists():
                
            #     return JsonResponse({'status': 'error', 'message': 'Username already exists'}, status=400)
            
            # # Create and save the student
            # teacher = Teacher.objects.create(
            #     username=username,
            #     email=email,
            #     password=make_password(password),  # Hash the password before saving
            #     is_student=False,
            # )
            # print(teacher)
            
            # user = User.objects.create_user(
            #     username=username,
            #     email=email,
            #     password=password,
            #     is_student=False  # Django's create_user automatically hashes the password
            # )
            # print(user)
            # return JsonResponse({'status': 'success', 'message': 'User registered successfully'}, status=201)
        
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON data'}, status=400)
        except Exception as e:
            print(str(e))
            return JsonResponse({'status': 'error', 'message': f'An error occurred: {str(e)}'}, status=500)
    
    return JsonResponse({'status': 'error', 'message': 'Only POST requests are allowed'}, status=400)