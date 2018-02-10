# -*- coding: utf-8 -*-
from django.conf.urls import url
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r'', views.HomeTypeViewSet, 'HomeType')
urlpatterns = router.urls