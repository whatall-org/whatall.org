from django.db import models
from timezone_field import TimeZoneField

class Venue(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    timezone = TimeZoneField(default='America/Los_Angeles', use_pytz=False)