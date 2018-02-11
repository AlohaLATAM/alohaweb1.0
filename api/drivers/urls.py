from django.conf.urls import url
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

urlpatterns = [
    url(r'^authorize/', views.TokenAuthenticationView.as_view()),
]
router.register(r'', views.DriverViewSet, 'Driver')
urlpatterns += router.urls