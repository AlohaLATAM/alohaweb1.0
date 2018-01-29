from django.db import models


class TruckSizeType(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    icon = models.CharField(max_length=50)
    number_stevedores = models.IntegerField(default=1)
    hour_price = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.name