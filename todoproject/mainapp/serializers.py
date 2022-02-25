from rest_framework.serializers import ModelSerializer
from .models import Project, Todo
from userapp.serializers import TodoUserModelSerializer


class ProjectModelSerializer(ModelSerializer):
    users = TodoUserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TodoModelSerializer(ModelSerializer):
    project = ProjectModelSerializer()
    user = TodoUserModelSerializer()

    class Meta:
        model = Todo
        fields = '__all__'
