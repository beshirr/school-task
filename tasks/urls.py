from django.urls import path
from . import views

app_name = 'tasks'

urlpatterns = [
    path('assigned', views.assigned_tasks, name='assigned_tasks'),
    path('search', views.search_tasks, name='search_tasks'),
    path('completed', views.completed_tasks, name='completed_tasks'),
    path('add_task', views.add_tasks, name='add_task'),
    path('tasks_list', views.tasks_list, name='tasks_list')
]