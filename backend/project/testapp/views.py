from django.shortcuts import render

# Create your views here.

# views.py
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.shortcuts import redirect

@csrf_exempt
def test(request):
    user=request.user
    #print(user.username)
    return JsonResponse({'status': 'success'}, status=200)
      