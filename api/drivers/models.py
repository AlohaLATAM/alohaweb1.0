from django.db import models
from api.core.models import Person

class Drivers(Person):
    license = models.IntegerField(max_length= 11)
    score = models.IntegerField(default= 0)