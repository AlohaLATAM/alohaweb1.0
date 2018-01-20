# -*- coding: utf-8 -*-

from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.response import Response
from . models import TruckSizeType
from . serializer import TruckSizeTypeSerializer

class TruckSizeTypeViewSet(viewsets.ViewSet):
    truck_size_type_serializer = TruckSizeTypeSerializer

    def list(self, request):
        truck_size_types = TruckSizeType.objects.all()
        results = self.truck_size_type_serializer(truck_size_types, many= True)

        return Response(results.data)