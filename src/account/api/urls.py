from django.urls import path
from account.api.views import (AccountView, Account, 
                               CreateAccountView, Account)
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('users', AccountView.as_view()),
    path('', Account.as_view()),
    path('<int:pk>', Account.as_view()),
    path('create', CreateAccountView.as_view()),
    path('login', obtain_auth_token)
]
