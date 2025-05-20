from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required, user_passes_test

from tasks.models import Task


def is_admin(user):
    return user.is_superuser


# Create your views here.
# @login_required
def teacher_dashboard(request):
    total_tasks = Task.objects.all().count()
    pending_tasks = Task.objects.filter(status='pending').count()
    tasks_completed = Task.objects.filter(status='completed').count()
    if request.user.is_superuser:
        return redirect('dashboard:admin_dashboard')
    return render(request, 'dashboard/teacher_dashboard.html', {
        'user_name' : request.user.username,
        'total_assigned_tasks' : total_tasks,
        'pending_tasks' : pending_tasks,
        'completed_tasks' : tasks_completed,
    })


# @login_required
# @user_passes_test(is_admin)
def admin_dashboard(request):
    total_tasks = Task.objects.all().count()
    pending_tasks = Task.objects.filter(status='pending').count()
    tasks_completed = Task.objects.filter(status='completed').count()
    return render(request, 'dashboard/admin_dashboard.html', {
        'user_name' : request.user.username,
        'total_tasks' : total_tasks,
        'pending_tasks': pending_tasks,
        'completed_tasks': tasks_completed,
    })

