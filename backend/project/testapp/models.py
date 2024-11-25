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
    #subjectid=models.JSONField(default=int,blank=True)
    def __str__(self):
        return self.name
class Subjects(models.Model):
    subject_id = models.JSONField(default=int,blank=True)  # Custom unique ID
    name = models.CharField(max_length=150, unique=True)
    #coursename = models.CharField(max_length=150, null=True, blank=True)
    chapters = models.JSONField(default=list, blank=True)

    def __str__(self):
        return self.name
    

class Quiz(models.Model):
    quiz_id = models.AutoField(primary_key=True)
    quiz=models.JSONField(blank=True)
    #coursename = models.CharField(max_length=150, null=True, blank=True)
    #chapters = models.JSONField(default=list, blank=True)
    # def __int__(self):
    #     return self.entry_id
class TestEntry(models.Model):
    entry_id = models.AutoField(primary_key=True)
    coursename = models.CharField(max_length=150)
    sub_id = models.CharField(null=True,max_length=150)
    #subject_id = models.JSONField(default=int,blank=True)  # Custom unique ID
    chap_id = models.CharField(max_length=150)
    quizzes=models.JSONField(default=list,blank=True)
    #coursename = models.CharField(max_length=150, null=True, blank=True)
    #chapters = models.JSONField(default=list, blank=True)
    # def __int__(self):
    #     return self.entry_id
# Create your models here.
