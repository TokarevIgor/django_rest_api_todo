from rest_framework.viewsets import ModelViewSet
from .models import Todo, Project
from .serializers import TodoModelSerializer, ProjectModelSerializer


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer


class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectModelSerializer
    queryset = Project.objects.all()
