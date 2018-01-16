from django.db import models

class Person(models.Model):
    first_name = models.CharField(max_length= 50)
    last_name = models.CharField(max_length= 50, blank= True, default= '')
    dni = models.IntegerField(max_length= 11)