from django.urls import path
from account.api.views import (AccountView, Account, 
                               CreateAccountView, Account, Login)

urlpatterns = [
    path('users', AccountView.as_view()),
    path('', Account.as_view()),        
    path('<int:pk>', Account.as_view()),
    path('create', CreateAccountView.as_view()),
    path('login', Login.as_view())
]
