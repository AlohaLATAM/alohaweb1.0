# -*- coding: utf-8 -*-
from rest_framework import viewsets, status
from rest_framework.response import Response
from . models import ClientQuotation
from .serializer import ClientQuotationSerializer


class ClientQuotationViewSet(viewsets.ViewSet):
    def create(self, request):
        quotation = ClientQuotation()
        quotation_id, message = quotation.register(request.data)

        if quotation_id:
            try:
                quotation = ClientQuotation.objects.get(pk=quotation_id)
            except:
                return Response('No se pudo encontrar la cotización registrada.', status=status.HTTP_404_NOT_FOUND)

            result = ClientQuotationSerializer(quotation)

            return Response(result.data)

        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        quotation = ClientQuotation()
        quotation_id, message = quotation.update(request.data, pk)

        if quotation_id:
            try:
                quotation = ClientQuotation.objects.get(pk=quotation_id)
            except:
                return Response('No se pudo encontrar la cotización registrada.', status=status.HTTP_404_NOT_FOUND)

            result = ClientQuotationSerializer(quotation)

            return Response(result.data)

        return Response(message, status=status.HTTP_400_BAD_REQUEST)
