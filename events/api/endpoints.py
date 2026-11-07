from rest_framework import generics
from events.models import Event
from .serializers import EventSerializer


class EventListView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer