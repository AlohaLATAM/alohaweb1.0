from rest_framework import serializers
from . models import Truck
from truck_size_types.serializer import TruckSizeTypeSerializer
from drivers.serializer import DriverSerializer


class TruckSerializer(serializers.ModelSerializer):
    driver = DriverSerializer('driver')
    truck_type = TruckSizeTypeSerializer('truck_type')


    class Meta:
        model = Truck
        fields = '__all__'