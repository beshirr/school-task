from django.urls import path
from . import views

app_name = 'dashboard'

urlpatterns = [
    path('teacher', views.teacher_dashboard, name='teacher_dashboard'),
    path('admin', views.admin_dashboard, name='admin_dashboard')
]