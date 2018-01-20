# -*- coding: utf-8 -*-

from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.response import Response
from . models import District
from . serializer import DistrictSerializer

class DistrictViewSet(viewsets.ViewSet):
    district_serializer = DistrictSerializer

    def list(self, request):
        districts = District.objects.all()
        results = self.district_serializer(districts, many= True)

        return Response(results.data)