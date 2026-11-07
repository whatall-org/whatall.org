from venues.models import Venue
from datetime import datetime, time
from django.utils import timezone
from django.db import models
import recurrence.fields

class Event(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    venue = models.ForeignKey(Venue, on_delete=models.CASCADE, related_name='events')
    when_date_start = models.DateField()
    when_date_end = models.DateField()
    when_time_start = models.TimeField()
    when_time_end = models.TimeField()
    recurrence = recurrence.fields.RecurrenceField(null=True, blank=True)

    next_occurrence = models.DateTimeField(null=True, blank=True, db_index=True)

    def calculate_next_occurrence(self):
        venue_tz = self.venue.timezone
        now = timezone.localtime(
            timezone.now(),
            venue_tz
        ).replace(tzinfo=None)
        if not self.recurrence:
            return datetime.combine(
                self.when_date_start,
                self.when_time_start
            )
        date_start = datetime.combine(
            self.when_date_start,
            self.when_time_start
        )
        next_date = self.recurrence.after(
            now,
            inc=True,
            dtstart=date_start
        )
        if next_date is None:
            return None
        return datetime.combine(
            next_date.date(),
            self.when_time_start
        )

    def save(self, *args, **kwargs):
        self.next_occurrence = self.calculate_next_occurrence()
        super().save(*args, **kwargs)