# -*- coding: utf-8 -*-
from django.conf import urls
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r'', views.TruckViewSet, 'Truck')
urlpatterns = router.urls