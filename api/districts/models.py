from django.db import models
from zones.models import Zone

class District(models.Model):
    name = models.CharField(max_length= 100)
    in_price = models.IntegerField()
    zone = models.ForeignKey(Zone, on_delete= models.CASCADE)

    def __str__(self):
        return self.name