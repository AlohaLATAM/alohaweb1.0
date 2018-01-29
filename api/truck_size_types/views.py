# -*- coding: utf-8 -*-
from rest_framework import status, viewsets
from rest_framework.response import Response
from . models import TruckSizeType
from . serializer import TruckSizeTypeSerializer

class TruckSizeTypeViewSet(viewsets.ViewSet):
    def list(self, request):
        truck_size_types = TruckSizeType.objects.all()
        results = TruckSizeTypeSerializer(truck_size_types, many= True)

        return Response(results.data)

    def create(self, request):
        truck_type = TruckSizeType()
        truck_type_id, message = truck_type.register(request.data)

        if truck_type_id:
            try:
                truck_type = TruckSizeType.objects.get(pk=truck_type_id)
            except:
                return Response('No se pudo encontrar el Tipo de Camión registrado.', status=status.HTTP_404_NOT_FOUND)

            results = TruckSizeTypeSerializer(truck_type)

            return Response(results.data)
        
        return Response(message, status=status.HTTP_400_BAD_REQUEST)