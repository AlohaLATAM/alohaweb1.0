from django.db import models
from stuff_size.models import StuffSize


class Stuff(models.Model):
    name = models.CharField(max_length=100)
    size = models.ForeignKey(StuffSize, on_delete=models.CASCADE)

    def __str__(self):
        return self.name