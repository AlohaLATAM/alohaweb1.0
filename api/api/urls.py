"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include, url
from . views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('api/districts/', include('districts.urls')),
    path('api/truck_size_types/', include('truck_size_types.urls')),
    path('api/leads/', include('leads.urls')),
    path('api/home_types/', include('home_types.urls')),
    path('api/quotations/', include('quotations.urls')),
    path('api/drivers/', include('drivers.urls')),
    path('api/inventory/', include('inventory_stuff.urls')),
    path('api/trucks/', include('trucks.urls')),

    url(r'^.*$', index, name='index')
]