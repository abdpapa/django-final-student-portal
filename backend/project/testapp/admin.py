from django.contrib import admin
from .models import Courses,Chapters,Subjects,TestEntry,Quiz
admin.site.register(Courses)
admin.site.register(Chapters)
admin.site.register(Subjects) 
admin.site.register(Quiz)  
admin.site.register(TestEntry)   
# Register your models here.
