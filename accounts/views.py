from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.models import User
import re

# Create your views here.
def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'Wrong email or password')
            return redirect('login')
    return render(request, 'accounts/login.html')

def signup_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        confirmPassword = request.POST['confirm_password']
        isAdmin = request.POST.get('is_admin') == 'on'

        if password != confirmPassword:
            messages.error(request, 'Passwords do not match')
        elif len(password) < 8:
            messages.error(request, 'Password must be at least 8 characters')
        elif not re.match(r'^[a-zA-Z]+$', username):
            messages.error(request, 'Username must contain only alphabets')
        elif User.objects.filter(email=email).exists():
            messages.error(request, 'Email already exists')
        elif User.objects.filter(username=username).exists():
            messages.error(request, 'Username already exists')
        else:
            user = User.objects.create_user(username=username, email=email)
            user.set_password(password)
            if isAdmin:
                user.user_type = 'admin'
            else :
                user.user_type = 'teacher'
            user.save()
            return redirect('login')

    return render(request, 'accounts/signup.html')
