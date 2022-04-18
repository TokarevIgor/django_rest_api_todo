import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from .views import ProjectViewSet
from userapp.models import TodoUser as User
from .models import Project, Todo


class TestProjectViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/project/')
        view = ProjectViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail(self):
        project = Project.objects.create(title='TEST')
        client = APIClient()
        response = client.get(f'/api/project/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        project = Project.objects.create(title='Пушкин')
        client = APIClient()
        response = client.put(
            f'/api/project/{project.id}/', {'title': 'TEST_TEST'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestTodoViewSet(APITestCase):
    def setUp(self) -> None:
        self.project = mixer.blend(Project)
        self.todo = mixer.blend(Todo)
        self.admin = User.objects.create_superuser(
            'igor123', email='igor@gmail.com', password='123')

    def test_get_list(self):
        self.client.force_login(self.admin)
        response = self.client.get('/api/todo/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
