from rest_framework import serializers
from . models import Quotation
from leads.serializer import LeadSerializer
from home_types.serializer import HomeTypeSerializer
from truck_size_types.serializer import TruckSizeTypeSerializer


class QuotationSerializer(serializers.ModelSerializer):
    lead = LeadSerializer('lead')
    home_type_from = HomeTypeSerializer('home_type_from')
    home_type_to = HomeTypeSerializer('home_type_to')
    truck_size_type = TruckSizeTypeSerializer('truck_size_type')

    class Meta:
        model = Quotation
        fields = ('id', 'lead', 'address_from', 'home_type_from', 'floor_from', 'address_to', 'home_type_to', 'floor_to', 'travel_distance_aprox', 'travel_distance_aprox_label', 'travel_time_aprox', 'travel_time_aprox_label', 'truck_size_type', 'packaging_time_aprox', 'packaging_price', 'travel_price', 'total_price', 'final_price', 'profit', 'created', 'state')