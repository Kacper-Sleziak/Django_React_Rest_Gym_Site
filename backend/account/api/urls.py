from django.urls import path
from account.api.views import (AccountView, CreateAccountView, 
                               Login, ChangePasswordView, ChangeAccountData)

urlpatterns = [
    path('<int:pk>', AccountView.as_view()),
    path('create', CreateAccountView.as_view()),
    path('login', Login.as_view()),
    path('change_password', ChangePasswordView.as_view()),
    path('change_data', ChangeAccountData.as_view())
]
