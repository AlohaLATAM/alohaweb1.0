from django.db import models


class StuffSize(models.Model):
    name = models.CharField(max_length=20)
    time_move = models.IntegerField(default=0, blank=False, null=False)
    time_instalation = models.IntegerField(default=0)
    time_packaging = models.IntegerField(default=0)

    def __str__(self):
        return self.name