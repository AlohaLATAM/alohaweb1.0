from rest_framework import serializers
from . models import Driver
from districts.serializer import DistrictSerializer


class DriverRegisteredSerializer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = ('id',)

class DriverSerializer(serializers.ModelSerializer):
    work_district = DistrictSerializer()

    class Meta:
        model = Driver
        fields = ('id', 'first_name', 'last_name', 'phone_number', 'dni', 'created', 'license_number', 'score', 'verified', 'work_district')