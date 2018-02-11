# -*- coding: utf-8 -*-
from rest_framework import viewsets, status
from rest_framework.response import Response
from . models import Truck
from . serializer import TruckSerializer
from hashids import Hashids


hashids = Hashids(salt='aloha-pe', min_length=4)


class TruckViewSet(viewsets.ViewSet):
    def create(self, request):
        truck = Truck()
        truck_id, message = truck.register(request.data)

        if truck_id:
            try:
                truck = Truck.objects.get(pk=truck_id)
            except:
                return Response('No se pudo encontrar el camión registrado', status=status.HTTP_404_NOT_FOUND)
            
            result = TruckSerializer(truck)

            return Response(result.data)
        
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        driver_id = request.query_params.get('driver_id')
        truck_size_type_id = request.query_params.get('truck_size_type_id')

        if driver_id:
            driver_id = hashids.decode(driver_id)
            trucks = Truck.objects.filter(driver=driver_id)
        elif truck_size_type_id:
            trucks = Truck.objects.filter(truck_type=truck_size_type_id)
        else:
            trucks = Truck.objects.all()

        results = TruckSerializer(trucks, many=True)

        return Response(results.data)