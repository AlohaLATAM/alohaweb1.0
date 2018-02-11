# -*- coding: utf-8 -*-
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from . models import Driver
from . serializer import DriverSerializer, DriverRegisteredSerializer
from hashids import Hashids


hashids = Hashids(salt='aloha-pe', min_length=4)


class TokenAuthenticationView(APIView) :
    def post(self, request):
        driver = Driver()
        token, message = driver.authenticate(request.data)

        if token:
            return Response({'token': token})

        return Response(message, status=status.HTTP_401_UNAUTHORIZED)


class DriverViewSet(viewsets.ViewSet):
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

    def retrieve(self, request, pk=None):
        pk = hashids.decode(pk)
        driver = get_object_or_404(Driver, pk=pk)
        result = DriverSerializer(driver)

        return Response(result.data)

    def list(self, request):
        drivers = Driver.objects.all()
        results = DriverSerializer(drivers, many=True)

        return Response(results.data)