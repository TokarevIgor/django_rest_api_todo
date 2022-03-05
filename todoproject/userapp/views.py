from rest_framework.viewsets import GenericViewSet
from rest_framework.pagination import LimitOffsetPagination
from .models import TodoUser
from .serializers import TodoUserModelSerializer
from rest_framework import mixins


class TodoUserLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TodoUserModelViewSet(mixins.ListModelMixin,
                           mixins.RetrieveModelMixin,
                           mixins.UpdateModelMixin,
                           GenericViewSet):
    queryset = TodoUser.objects.all()
    serializer_class = TodoUserModelSerializer
    filterset_fields = ['username', 'first_name', 'last_name']
    pagination_class = TodoUserLimitOffsetPagination
