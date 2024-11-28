from django.db import models
from authentication.models import Student
from authentication.models import Teacher
from testapp.models import Courses



class EnrollTable(models.Model):
    studentname =models.CharField(max_length=255)
    coursename = models.CharField(max_length=255)
    enrollment_date = models.DateField(auto_now_add=True)
    
    
    
