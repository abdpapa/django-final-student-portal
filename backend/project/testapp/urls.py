from django.urls import path
from .views import test
from rest_framework.routers import DefaultRouter



urlpatterns = [
    path('',test)
]