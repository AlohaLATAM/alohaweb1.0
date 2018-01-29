from django.db import models
from leads.models import Lead
from districts.models import District
from truck_size_types.models import TruckSizeType


class Quotation(models.Model):
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE)
    address_from = models.CharField(max_length=200)
    district_from = models.ForeignKey(District, on_delete=models.CASCADE, related_name='district_from')
    lat_long_from = models.CharField(max_length=20)
    address_to = models.CharField(max_length=200)
    district_to = models.ForeignKey(District, on_delete=models.CASCADE, related_name='district_to')
    lat_long_to = models.CharField(max_length=20)
    travel_time_aprox = models.IntegerField()
    truck_size_type = models.ForeignKey(TruckSizeType, on_delete=models.CASCADE)