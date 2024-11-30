from django.urls import path
from .views import getSubjects,getChapters,getQuizzes,AddTestScores,getStudentQuizCount

urlpatterns = [
    path('getSubjects/', getSubjects),
    path('getChapters/', getChapters),
    path('getQuizzes/', getQuizzes),
    path('addScore/', AddTestScores),
    path('getStudentQuizCount/<str:studentName>/', getStudentQuizCount),
]