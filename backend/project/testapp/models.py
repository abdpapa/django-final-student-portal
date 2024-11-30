from django.db import models
class Courses(models.Model):
    name = models.CharField(max_length=150, unique=True)
    teachers = models.JSONField(default=list, blank=True)
    subjects=models.JSONField(default=list, blank=True)
    


    def __str__(self):
        return self.name
    


class Chapters(models.Model):
    chapter_id = models.JSONField(default=int,blank=True)  # Custom unique ID
    name = models.CharField(max_length=150, unique=True)
    def __str__(self):
        return self.name
class Subjects(models.Model):
   
    name = models.CharField(max_length=150, unique=True)
  
    chapters = models.JSONField(default=list, blank=True)

    def __str__(self):
        return self.name
    

# class Quiz(models.Model):
#     quiz=models.JSONField(default=dict, blank=True)

   
class TestEntry(models.Model):
    entry_id = models.AutoField(primary_key=True)
    coursename = models.CharField(max_length=150)
    sub_id= models.CharField(null=True,max_length=150)
    chap_id = models.CharField(max_length=150)
    quizzes=models.JSONField(default=list,blank=True)

    def getQuizCount(self):
        return len(self.quizzes)
