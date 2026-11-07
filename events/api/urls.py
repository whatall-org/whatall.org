from django.urls import path
from .endpoints import EventListView

urlpatterns = [
    path('json', EventListView.as_view(), name='event-json'),
]