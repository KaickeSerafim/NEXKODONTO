from django.urls import path

from .views import LoginView, UserMe


urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('user/me/', UserMe.as_view(), name='user'),
]
 

 