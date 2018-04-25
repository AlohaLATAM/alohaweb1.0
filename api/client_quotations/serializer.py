from rest_framework import serializers
from . models import ClientQuotation
from leads.serializer import LeadSerializer
from home_types.serializer import HomeTypeSerializer
from truck_size_types.serializer import TruckSizeTypeSerializer


class ClientQuotationSerializer(serializers.ModelSerializer):
    lead = LeadSerializer('lead')
    home_type_from = HomeTypeSerializer('home_type_from')
    home_type_to = HomeTypeSerializer('home_type_to')
    truck_size_type = TruckSizeTypeSerializer('truck_size_type')

    class Meta:
        model = ClientQuotation
        fields = '__all__'
