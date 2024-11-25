from django.db import models
from authentication.models import Student
from authentication.models import Teacher
from testapp.models import Courses

# class Course(models.Model):
#     name = models.CharField(max_length=50)
#     description = models.TextField()
#     teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    
#     def _str_(self):
#         return self.name

class EnrollTable(models.Model):
    studentname =models.CharField(max_length=255)
    coursename = models.CharField(max_length=255)
    enrollment_date = models.DateField(auto_now_add=True)
    
    def _str_(self):
        return f"{self.student.username} enrolled in {self.course.name}"

# class Chapter(models.Model):
#     course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="chapters")
#     title = models.CharField(max_length=255)
#     order = models.PositiveIntegerField()

#     class Meta:
#         ordering = ['order']

#     def _str_(self):
#         return f"{self.title} (Course: {self.course.name})"
    
# class Quiz(models.Model):
#     chapter = models.OneToOneField(Chapter, on_delete=models.CASCADE, related_name="quiz")
#     title = models.CharField(max_length=255)

#     def _str_(self):
#         return f"Quiz for {self.chapter.title}"
    
# class Question(models.Model):
#     quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="questions")
#     question_text = models.TextField()
#     order = models.PositiveIntegerField()

#     class Meta:
#         ordering = ['order']

#     def _str_(self):
#         return f"Question {self.order} for Quiz: {self.quiz.title}"

# class Choice(models.Model):
#     question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="choices")
#     choice_text = models.CharField(max_length=255)
#     is_correct = models.BooleanField(default=False)

#     def _str_(self):
#         return f"Choice for Question {self.question.id}: {self.choice_text} ({'Correct' if self.is_correct else 'Incorrect'})"