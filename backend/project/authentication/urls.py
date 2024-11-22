
from django.urls import path
from .views import loginStudent,registerStudent,registerTeacher,loginTeacher
from rest_framework.routers import DefaultRouter



urlpatterns = [
    path('studentlogin/',loginStudent),
    path('studentregister/',registerStudent),
    path('teacherregister/',registerTeacher),
    path('teacherlogin/',loginTeacher),
]
                                                                                         