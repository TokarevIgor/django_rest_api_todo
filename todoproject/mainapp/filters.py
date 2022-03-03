from django_filters import rest_framework as filters
from .models import Todo, Project


class ProjectFilter(filters.FilterSet):

    title = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['title']


class TodoFilter(filters.FilterSet):
    # Как понял можно 2 варианта, я выбрал через ISO сделать фильтр с - по
    # from_created = filters.DateFilter(field_name="created", lookup_expr='gte')
    # to_created = filters.DateFilter(field_name="created", lookup_expr='lte')
    created = filters.IsoDateTimeFromToRangeFilter(field_name="created")

    class Meta:
        model = Todo
        fields = ['project']
