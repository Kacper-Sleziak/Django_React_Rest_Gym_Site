from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
# Imports from project
from account.models import Account as AccountModel
from account.api.serializers import (
    AccountSerializer,
    LoginSerializer,
    PasswordChangeSerializer,
    AccountChangeDataSerializer)


def is_account_with_given_id(self, pk):

    queryset = AccountModel.objects.filter(id=pk)

    if queryset.exists():
        return True
    else:
        return False


# [POST] Login API View
# End point needs password and user's email

class LoginView(APIView):

    def post(self, request, format=None):
        serializer = LoginSerializer(data=self.request.data,
                                     context={'request': self.request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token = Token.objects.get(user=user)

        return Response({
            'token': token.key,
            'email': user.email,
            'nickname': user.nickname
        }, status=status.HTTP_200_OK)

# [DELETE, GET] Account View


class AccountView(APIView):
    serializer_class = AccountSerializer

    def get(self, request, pk, format=None):
        if self.is_account_with_given_id(pk):
            return Response(
                self.serializer_class(
                    request.data),
                status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk, format=None):

        if not is_account_with_given_id(pk):
            return Response(status=status.HTTP_404_NOT_FOUND)

        account = AccountModel.objects.get(id=pk)
        account.delete()
        account.save()

        return Response(status=status.HTTP_200_OK)

# [POST] View Creating Account by post request
# End Point needs nickname, email, password and password2


class CreateAccountView(APIView):
    serializer_class = AccountSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            account = serializer.save()

            token = Token.objects.get(user=account)
            token_key = token.key
            feedback_data = AccountSerializer(account).data
            feedback_data["token"] = token_key
            return Response(feedback_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# [PUT] View Change password of account
# End Point need old_password, password, and password2


class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = PasswordChangeSerializer
    authentication_classes = [TokenAuthentication]
    model = AccountModel
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        return self.request.user

# [PUT] View Change data of account
# Data includes nickname, first_name, last_name,
# None of fields in required


class ChangeAccountData(generics.UpdateAPIView):
    serializer_class = AccountChangeDataSerializer
    authentication_classes = [TokenAuthentication]
    model = AccountModel
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        return self.request.user
