from django.db import models


class TruckSizeType(models.Model):
    TRUCK_VALUES = (
        ('xs', 'Pequeño'),
        ('md', 'Mediano'),
        ('lg', 'grande')
    )

    name = models.CharField(max_length=50)
    number_stevedores = models.IntegerField(default=1)
    hour_price = models.IntegerField(blank=True, null=True)
    time_per_service = models.IntegerField(default=1)
    value = models.CharField(max_length=5, default='', choices=TRUCK_VALUES)
    description = models.CharField(max_length=250, default='')

    def __str__(self):
        return self.name
