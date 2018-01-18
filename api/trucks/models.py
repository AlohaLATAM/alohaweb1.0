from django.db import models
from truck_size_types.models import TruckSizeType
from drivers.models import Driver

class Truck(models.Model):
    driver = models.ForeignKey(Driver, on_delete= models.CASCADE, null= True)
    registration_number = models.CharField(max_length= 15)
    truck_size_type = models.ForeignKey(TruckSizeType, on_delete= models.CASCADE)
    created = models.DateTimeField(auto_now_add= True)