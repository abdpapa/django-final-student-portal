from django.urls import path
from .views import get_courses,get_subjects,get_chapters,Add_test,get_quizzes,getTotalQuizCount
from rest_framework.routers import DefaultRouter



urlpatterns = [
    path('getCourses/',get_courses),
    path('getSubjects/',get_subjects),
    path('getChapters/',get_chapters),
    path('AddTest/',Add_test),
    path('getQuizzes/',get_quizzes),
    path('getTotalQuizCount/<str:courseName>/',getTotalQuizCount),
]