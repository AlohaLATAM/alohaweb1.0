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
    hash_id = hashids.encode(id)

    class Meta:
        model = Driver
        fields = ('id', 'hash_id', 'first_name', 'last_name', 'phone_number', 'dni', 'created', 'license_number', 'score', 'verified', 'work_district')