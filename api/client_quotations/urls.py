# -*- coding: utf-8 -*-
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r'', views.ClientQuotationViewSet, 'ClientQuotation')
urlpatterns = router.urls
