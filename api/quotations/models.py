from django.db import models
from leads.models import Lead
from trucks.models import Truck
from districts.models import District

class Quotation(models.Model):
    started_time = models.DateTimeField()
    end_time = models.DateTimeField()
    lead = models.ForeignKey(Lead, on_delete= models.CASCADE)
    address_from = models.CharField(max_length= 200)
    district_from = models.ForeignKey(District, on_delete= models.CASCADE, related_name='district_from')
    address_to = models.CharField(max_length= 200)
    district_to = models.ForeignKey(District, on_delete= models.CASCADE, related_name='district_to')
    distance_price = models.IntegerField()
    truck = models.ForeignKey(Truck, on_delete= models.CASCADE)
    truck_price = models.IntegerField()
    final_truck_price = models.IntegerField()
    total_extra_stevedores = models.IntegerField()
    extra_stevedores_price = models.IntegerField()
    final_extra_stevedores_price = models.IntegerField()
    base_gain = models.IntegerField()
    final_gain = models.IntegerField()