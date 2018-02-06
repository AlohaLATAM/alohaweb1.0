from rest_framework import serializers
from . models import InventoryStuff


class InventoryStuffSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryStuff
        fields = '__all__'