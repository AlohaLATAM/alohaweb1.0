from rest_framework import serializers
from . models import Truck
from drivers.serializer import DriverSerializer
from truck_size_types.serializer import TruckSizeTypeSerializer

class TruckSerializer(serializers.ModelSerializer):
    driver = DriverSerializer()
    truck_size_type = TruckSizeTypeSerializer()

    class Meta:
        model = Truck
        fields = ('id', 'registration_number', 'driver', 'truck_size_type')