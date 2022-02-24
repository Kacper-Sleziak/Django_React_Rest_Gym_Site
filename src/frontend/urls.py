from django.urls import path
from frontend.views import index

urlpatterns = [
    path("", index),
    path("login", index),
    path("register", index),
    path("blog", index),
]
