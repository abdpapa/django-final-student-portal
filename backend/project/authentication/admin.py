# authentiation/admin.py
from django.contrib import admin
from .models import User,Student,Teacher,TeacherRequest
from testapp.models import Courses
from django.views.decorators.csrf import csrf_exempt
admin.site.register(User)
# admin.site.register(StudentProfile)
# admin.site.register(TeacherProfile)
admin.site.register(Student)
admin.site.register(Teacher)
#admin.site.register(Courses)

@admin.register(TeacherRequest)
class TeacherRequestAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'is_approved', 'created_at')
    list_filter = ('is_approved',)
    search_fields = ('username', 'email')
    actions = ['approve_teacher_requests']
    @csrf_exempt
    def approve_teacher_requests(self, request, queryset):
        """Admin action to approve selected teacher requests."""
        for teacher_request in queryset:
            if not teacher_request.is_approved:
                # Create the User for the approved teacher
               
                User.objects.create_user(
                    username=teacher_request.username,
                    email=teacher_request.email,
                    password=teacher_request.password
                )
                teacher_request.is_approved = True
                teacher_request.save()

                Teacher.objects.create(
                    username=teacher_request.username,
                    email=teacher_request.email,
                    password=teacher_request.password,  # Hash the password before saving
                    is_student=False,
                    courses=teacher_request.courses
                )
                try:
        # Query the course by name
                    

        # Append the teacher's name to the 'teachers' field
                    for name in teacher_request.courses:
                     course = Courses.objects.get(name=name)
                     if teacher_request.username not in course.teachers:
                       course.teachers.append(teacher_request.username)
                       course.save()  # Save the updated instance
                      # return f"Teacher {teacher_name} added to course {course_name}."
                     else:
                        # return f"course doesn't exist"
                        return f"Teacher {teacher_request.username} is already listed in course {name}."
                except Courses.DoesNotExist:
                     return f"Course {name} does not exist."
                except Exception as e:
                     return f"An error occurred: {str(e)}"



        self.message_user(request, f"{queryset.count()} teacher(s) approved.")
    approve_teacher_requests.short_description = "Approve selected teacher requests"


# Register your models here.
