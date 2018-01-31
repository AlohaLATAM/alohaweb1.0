# -*- coding: utf-8 -*-
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.response import Response
from . models import Lead
from . serializer import LeadSerializer

class LeadViewSet(viewsets.ViewSet):
    def create(self, request):
        lead = Lead()
        lead_id, message = lead.register(request.data)

        if lead_id:
            try:
                lead = Lead.objects.get(pk=lead_id)
            except:
                return Response('No se pudo encontrar el Lead registrado.', status=status.HTTP_404_NOT_FOUND)

            result = LeadSerializer(lead)

            return Response(result.data)
        
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        lead = get_object_or_404(Lead, pk=pk)
        result = LeadSerializer(lead)

        return Response(result.data)

    def list(self, request):
        leads = Lead.objects.all()
        results = LeadSerializer(leads, many= True)

        return Response(results.data)