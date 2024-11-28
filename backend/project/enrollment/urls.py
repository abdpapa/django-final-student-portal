from django.urls import path
from .views import getCourses, EnrollStudentCourse,getEnrolledCourses

urlpatterns = [
    path('getCourses/', getCourses, name='course-list'),
    path('getEnrolledCourses/', getEnrolledCourses, name='get-enrolled-courses'), 
    path('enrollcourse/', EnrollStudentCourse, name='enroll-course'),
]