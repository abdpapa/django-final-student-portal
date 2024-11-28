from django.db import models


class TestScores(models.Model):
    studentname=models.CharField(max_length=150)
    coursename=models.CharField(max_length=150)
    subjectname=models.CharField(max_length=150)
    chapname=models.CharField(max_length=150)
    quizuniqueidenitiy=models.CharField( default=list,max_length=150)
    points=models.JSONField(default=int,blank=True)
# Create your models here.
