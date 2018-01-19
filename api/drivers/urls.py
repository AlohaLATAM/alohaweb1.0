#! /usr/bin/env python3
# -*- coding: utf-8 -*-
from django.conf.urls import url, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'drivers', views.DriverViewSet, 'Driver');

urlpatterns = [
    url(r'^', include(router.urls))
]