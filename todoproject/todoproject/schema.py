import graphene
from graphene_django import DjangoObjectType
from mainapp.models import Todo, Project
from userapp.models import TodoUser


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TodoUserType(DjangoObjectType):
    class Meta:
        model = TodoUser
        fields = ['username', 'first_name', 'last_name', 'email']


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)

    def resolve_all_projects(root, info):
        return Project.objects.all()

    all_todos = graphene.List(TodoType)

    def resolve_all_todo(root, info):
        return Todo.objects.all()

    all_users = graphene.List(TodoUserType)

    def resolve_all_all_users(root, info):
        return TodoUser.objects.all()

    project_by_id = graphene.Field(
        ProjectType, pk=graphene.Int(required=True))

    def resolve_project_by_id(root, info, pk):
        try:
            return Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            return None


schema = graphene.Schema(query=Query)
