from django.db import models

class Zone(models.Model):
    name = models.CharField(max_length= 20)
    in_price = models.IntegerField()

    def __str__(self):
        return self.name