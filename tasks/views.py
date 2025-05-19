from django.contrib.auth.models import User
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

from tasks.models import Task


# Create your views here.
# @login_required
def assigned_tasks(request):
    return render(request, 'tasks/assigned_tasks.html')


def search_tasks(request):
    return render(request, 'tasks/search_tasks.html')


def completed_tasks(request):
    return render(request, 'tasks/completed_tasks.html')


def view_task(request, task_id):
    return 'task details'


def edit_task(request, task_id):
    return 'edit task'


@csrf_exempt
def add_tasks(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        teacher_id = request.POST.get('teacher')
        priority = request.POST.get('priority')
        description = request.POST.get('description')
        assigned_to = get_object_or_404(User, id=teacher_id)
        # Use a hard-coded admin user instead of request.user
        admin_user = User.objects.get(username='admin_sql')

        task = Task.objects.create(
            title=title,
            description=description,
            priority=priority,
            # created_by=request.user,
            created_by=admin_user,
            assigned_to=assigned_to,
            status='pending'
        )
    teachers = User.objects.filter(profile__user_type='teacher')
    return render(request, 'tasks/add_task.html', {
        'teachers' : teachers
    })


def tasks_list(request):
    admin_user = User.objects.get(username='admin_sql')
    tasks = Task.objects.filter(created_by=admin_user).order_by('-created_at')
    return render(request, 'tasks/task_list.html', {
        'tasks' : tasks
    })