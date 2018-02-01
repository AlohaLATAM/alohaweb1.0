# -*- coding: utf-8 -*-
from rest_framework import viewsets, status
from rest_framework.response import Response
from . models import Driver
from . serializer import DriverSerializer, DriverRegisteredSerializer


class DriverViewSet(viewsets.ViewSet):
    def list(self, request):
        drivers = Driver.objects.all()
        results = DriverSerializer(drivers, many=True)

        return Response(results.data)
    
    def create(self, request):
        driver = Driver()
        driver_id, message = driver.register(request.data)

        if driver_id:
            try:
                driver = Driver.objects.get(pk=driver_id)
            except:
                return Response('El registro falló.', status=status.HTTP_404_NOT_FOUND)

            results = DriverRegisteredSerializer(driver)

            return Response(results.data)
        else:
            return Response(message, status=status.HTTP_400_BAD_REQUEST)