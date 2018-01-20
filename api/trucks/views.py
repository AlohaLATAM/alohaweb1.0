# -*- coding: utf-8 -*-

from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.response import Response
from . models import Truck
from . serializer import TruckSerializer

class TruckViewSet(viewsets.ViewSet):

    truck_serializer = TruckSerializer

    def list(self, request):
        trucks = Truck.objects.all()
        results = self.truck_serializer(trucks, many= True)

        return Response(results.data)