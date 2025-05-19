from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class UserProfile(models.Model):
    USER_TYPES = [
        ('admin', 'Administrator'),
        ('teacher', 'Teacher')
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    user_type = models.CharField(max_length=10, choices=USER_TYPES)


    def __str__(self):
        return f"{self.user.username}'s profile"