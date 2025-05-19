from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required, user_passes_test


def is_admin(user):
    return user.is_superuser


# Create your views here.
# @login_required
def teacher_dashboard(request):
    if request.user.is_superuser:
        return redirect('dashboard:admin_dashboard')
    return render(request, 'dashboard/teacher_dashboard.html')


# @login_required
# @user_passes_test(is_admin)
def admin_dashboard(request):
    return render(request, 'dashboard/admin_dashboard.html')

