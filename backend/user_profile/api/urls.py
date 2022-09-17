from django.urls import path
from user_profile.api.views import EditUserProfile, GetUserProfile

urlpatterns = [
    path('<str:nickname>', GetUserProfile.as_view()),
    path('edit/<str:nickname>', EditUserProfile.as_view())
]

