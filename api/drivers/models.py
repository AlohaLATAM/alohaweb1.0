from django.db import models
from core.models import Person

class Driver(Person):
    license = models.IntegerField()
    score = models.IntegerField(default= 0)