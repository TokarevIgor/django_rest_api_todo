from django.contrib import admin
from .models import TodoUser
from mainapp.models import Project, Todo

admin.site.register(TodoUser)
admin.site.register(Project)
admin.site.register(Todo)
