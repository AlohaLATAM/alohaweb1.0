from rest_framework import serializers
from . models import TruckSizeType

class TruckSizeTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TruckSizeType
        fields = '__all__'