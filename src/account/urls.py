from django.urls import path
from account.serializers import CreateAccountSerializer
from account.views import AccountView, Account, CreateAccountView

urlpatterns = [
    path('users/', AccountView.as_view()),
    path('', Account.as_view()),
    path('<int:pk>/', Account.as_view()),
    path('create/', CreateAccountView.as_view())
]
