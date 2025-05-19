from django.contrib import admin
from django.urls import path, include  # Change this line

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('tasks/', include('tasks.urls')),
    path('', include('dashboard.urls')),
]