from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class TodoUser(AbstractUser):
    age = models.PositiveIntegerField(verbose_name='возраст', default=0, blank=True)
    city = models.CharField(max_length=64, verbose_name='город', blank=True)
    phone_number = models.CharField(
        max_length=14, verbose_name='номер телефона', blank=True)
    email = models.EmailField(_('email address'), unique=True)
    