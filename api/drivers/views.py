# -*- coding: utf-8 -*-

from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from . models import Driver
from . serializer import DriverSerializer

class DriverViewSet(viewsets.ViewSet):

    driver_serializer = DriverSerializer

    def create(self, request):
        serializer = self.driver_serializer(data= request.data)

        if serializer.is_valid():
            Driver.objects.create(**serializer.data)

            return Response({'message': 'Driver created.'}, status= status.HTTP_201_CREATED)

        return Response({'message': 'Driver could not be created with recieved data.'}, status= status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk= None):
        driver = get_object_or_404(Driver, id= pk)
        result = DriverSerializer(driver)

        return Response(result.data)

    def list(self, request):
        drivers = Driver.objects.all()
        results = self.driver_serializer(drivers, many= True)

        return Response(results.data)