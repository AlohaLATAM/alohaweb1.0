from django.db import models
from core.models import Person

class Account(Person):
    email= models.EmailField(unique= True, max_length= 100)
    password= models.CharField(max_length= 200)