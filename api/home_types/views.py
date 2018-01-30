# -*- coding: utf-8 -*-
from rest_framework import viewsets
from rest_framework.response import Response
from . models import HomeType
from . serializer import HomeTypeSerializer


class HomeTypeViewSet(viewsets.ViewSet):
    def list(self, request):
        home_types = HomeType.objects.all()
        results = HomeTypeSerializer(home_types, many=True)

        return Response(results.data)