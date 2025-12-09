from django.urls import path

from .views import  UserMe


urlpatterns = [
    path('user/me/', UserMe.as_view(), name='user'),
]
 