#! /usr/bin/env python3
# -*- coding: utf-8 -*-
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework import viewsets
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

class TokenAuthenticationView(ObtainAuthToken):

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        account = authenticate(email= email, password= password)
        pass