from django.urls import path
from .views import getSubjects,getChapters,getQuizzes,AddTestScores

urlpatterns = [
    path('getSubjects/', getSubjects),
    path('getChapters/', getChapters),
    path('getQuizzes/', getQuizzes),
    path('addScore/', AddTestScores),

]