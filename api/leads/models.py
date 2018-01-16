from django.db import models
from api.core.models import Person

class Leads(Person):
    created = models.DateTimeField(auto_now_add= True)