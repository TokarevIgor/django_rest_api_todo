from tkinter import CASCADE
from django.db import models
from userapp.models import TodoUser


class Project(models.Model):
    title = models.CharField(max_length=256)
    users = models.ManyToManyField(TodoUser)

    def __str__(self):
        return self.title


class Todo(models.Model):
    project = models.ForeignKey(
        Project, verbose_name='work project', on_delete=models.CASCADE)
    text = models.TextField(verbose_name='text description')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(
        TodoUser, verbose_name='чья заметка', on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.first_name} {self.created}'
