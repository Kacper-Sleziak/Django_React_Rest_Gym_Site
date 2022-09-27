from django.urls import path

from account.api.views import (
    AccountView,
    ChangeAccountData,
    ChangePasswordView,
    CreateAccountView,
    LoginView,
)

urlpatterns = [
    path("<int:pk>", AccountView.as_view()),
    path("register", CreateAccountView.as_view()),
    path("change_password", ChangePasswordView.as_view()),
    path("change_data", ChangeAccountData.as_view()),
    path("login", LoginView.as_view()),
]
