from rest_framework import serializers
from . models import Quotation
from leads.serializer import LeadSerializer
from home_types.serializer import HomeTypeSerializer
from truck_size_types.serializer import TruckSizeTypeSerializer
from trucks.serializer import TruckSerializer


class QuotationSerializer(serializers.ModelSerializer):
    lead = LeadSerializer('lead')
    home_type_from = HomeTypeSerializer('home_type_from')
    home_type_to = HomeTypeSerializer('home_type_to')
    truck_size_type = TruckSizeTypeSerializer('truck_size_type')
    assigned_truck = TruckSerializer('assigned_truck')

    class Meta:
        model = Quotation
        fields = '__all__'