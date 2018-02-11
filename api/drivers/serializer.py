from rest_framework import serializers
from . models import Driver
from districts.serializer import DistrictSerializer
from hashids import Hashids


hashids = Hashids(salt='aloha-pe', min_length=4)


class DriverRegisteredSerializer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = ('id',)

class DriverSerializer(serializers.ModelSerializer):
    work_district = DistrictSerializer()

    class Meta:
        model = Driver
        fields = '__all__'