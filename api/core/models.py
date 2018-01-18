from django.db import models

class Person(models.Model):
    first_name = models.CharField(max_length= 50)
    last_name = models.CharField(max_length= 50, blank= True, default= '')
    dni = models.IntegerField(unique= True)
    created = models.DateTimeField(auto_now_add= True, null= True, blank= True)