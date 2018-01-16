from django.db import models

class Trucks(models.Model):
    created = models.DateTimeField(auto_now_add= True)
    registration_number = models.CharField(max_length= 10)