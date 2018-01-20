#! /usr/bin/env python3
# -*- coding: utf-8 -*-
from django.conf.urls import url
from rest_framework import routers
from rest_framework.authtoken import views
from views import TokenAuthenticationView

router = routers.DefaultRouter()

urlpatterns = [
    url(r'auth', TokenAuthenticationView.as_view())
]