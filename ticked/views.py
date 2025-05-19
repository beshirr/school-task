from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

def index_view(request):
    if request.user.is_authenticated:
        if request.user.is_superuser:
            return redirect('dashboard:admin_dashboard')
        else:
            return redirect('dashboard:teacher_dashboard')
    return render(request, 'pages/base/index.html')