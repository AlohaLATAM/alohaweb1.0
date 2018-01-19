from django.db import models
from core.models import Person

class Driver(Person):
    license = models.CharField(max_length= 20)
    score = models.IntegerField(default= 0)

    def __str__(self):
        return '%s %s' % (self.first_name, self.last_name)