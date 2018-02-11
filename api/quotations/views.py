# -*- coding: utf-8 -*-
from rest_framework import viewsets, status
from rest_framework.response import Response
from . models import Quotation
from . serializer import QuotationSerializer


class QuotationViewSet(viewsets.ViewSet):
    def create(self, request):
        quotation = Quotation()
        quotation_id, message = quotation.register(request.data)

        if quotation_id:
            try:
                quotation = Quotation.objects.get(pk=quotation_id)
            except:
                return Response('No se pudo encontrar la cotización registrada.', status=status.HTTP_404_NOT_FOUND)

            result = QuotationSerializer(quotation)

            return Response(result.data)

        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        if not pk:
            return Response('Es necesario el ID de la cotización.', status=status.HTTP_404_NOT_FOUND)

        quotation = Quotation()
        quotation_id, message = quotation.assign_driver_or_truck(pk, request.data)

        if quotation_id:
            try:
                quotation = Quotation.objects.get(pk=quotation_id)
            except:
                return Response('No se pudo encontrar la cotización registrada.', status=status.HTTP_404_NOT_FOUND)

            result = QuotationSerializer(quotation)

            return Response(result.data)

        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        quotation = Quotation.objects.get(pk=pk)
        result = QuotationSerializer(quotation)

        return Response(result.data)

    def list(self, request):
        driver_id = request.query_params.get('driver_id')
        truck_id = request.query_params.get('truck_id')
        truck_size_type_ids = request.query_params.get('truck_size_type_ids')
        lead_id = request.query_params.get('lead_id')
        not_assigned = request.query_params.get('not_assigned')

        print(driver_id)

        if driver_id:
            quotations = Quotation.objects.filter(assigned_driver=driver_id)
        elif truck_size_type_ids:
            truck_size_type_ids = truck_size_type_ids.split(',')
            quotations = Quotation.objects.filter(truck_size_type__in=truck_size_type_ids, assigned_driver=None)
        elif truck_id:
            quotations = Quotation.objects.filter(assigned_truck=truck_id)
        elif lead_id:
            quotations = Quotation.objects.filter(lead=lead_id)
        elif not_assigned:
            quotations = Quotation.objects.filter(assigned_truck=None)
        else:
            quotations = Quotation.objects.all()
        
        results = QuotationSerializer(quotations, many=True)

        return Response(results.data)