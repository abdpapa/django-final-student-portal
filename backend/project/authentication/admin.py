# authentiation/admin.py
from django.contrib import admin
from .models import User,Student,Teacher,TeacherRequest
from django.views.decorators.csrf import csrf_exempt
admin.site.register(User)
# admin.site.register(StudentProfile)
# admin.site.register(TeacherProfile)
admin.site.register(Student)
admin.site.register(Teacher)
#admin.site.register(TeacherRequest)

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
            )


        self.message_user(request, f"{queryset.count()} teacher(s) approved.")
    approve_teacher_requests.short_description = "Approve selected teacher requests"


# Register your models here.
