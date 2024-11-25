from django.urls import path
from .views import getCourses, EnrollStudentCourse

urlpatterns = [
    path('getCourses/', getCourses, name='course-list'),
    path('enrollcourse/', EnrollStudentCourse, name='enroll-course'),  
]