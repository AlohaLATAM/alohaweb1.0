# -*- coding: utf-8 -*-

from django.conf.urls import url, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'', views.DistrictViewSet, 'District')

urlpatterns = [
    url(r'^', include(router.urls))
]