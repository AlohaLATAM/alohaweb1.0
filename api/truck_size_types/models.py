from django.db import models

class TruckSizeType(models.Model):
    description = models.CharField(max_length= 200)
    length = models.DecimalField(max_digits= 10, decimal_places= 2)
    width = models.DecimalField(max_digits= 10, decimal_places= 2)
    height = models.DecimalField(max_digits= 10, decimal_places= 2)
    total_stevedores = models.IntegerField()
    base_price = models.IntegerField()