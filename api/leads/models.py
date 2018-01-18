from django.db import models
from core.models import Person

class Lead(Person):
    email = models.CharField(max_length= 100)