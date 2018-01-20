# -*- coding: utf-8 -*-

from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.response import Response
from . models import Lead
from . serializer import LeadSerializer

class LeadViewSet(viewsets.ViewSet):
    lead_serializer = LeadSerializer

    def list(self, request):
        leads = Lead.objects.all()
        results = self.lead_serializer(leads, many= True)

        return Response(results.data)