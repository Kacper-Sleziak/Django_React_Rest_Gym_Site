from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
# Imports from project
from account.models import Account as AccountModel
from account.api.serializers import (AccountSerializer, CreateAccountSerializer, LoginSerializer, 
                                     UpdateAccountSerializer)

class Login(APIView):
    serializer_class = LoginSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data,)
        
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            
            queryset = AccountModel.objects.all().filter(email=email)
            if queryset.exists():
                user = queryset[0]
                if user.check_password(password):
                    token = Token.objects.get(user=user)
                    return Response({
                        'token': token.key,
                        'email': user.email,
                        'nickname': user.nickname
                    }, status=status.HTTP_200_OK)
            return Response({'error': "Email or password is not correct!"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Create your views here.
class AccountView(generics.ListAPIView):
    queryset = AccountModel.objects.all()
    serializer_class = AccountSerializer
    
# Account View
class Account(APIView):
    serializer_class = UpdateAccountSerializer

    # Checking if in database is account with give pk
    def is_account_with_given_id(self, pk):
        
        queryset = AccountModel.objects.filter(id=pk)
        
        if queryset.exists():
            return True
        else:
            return False
        
    # Put Request to update account object
    def put(self, request, pk, format=None):
        
        if not self.is_account_with_given_id(pk):
            return Response(status=status.HTTP_204_NO_CONTENT)
            
        account = AccountModel.objects.get(id=pk)   
        serializer = self.serializer_class(account, data=request.data)        
        
        if serializer.is_valid():
            serializer.save()
        
            return Response(AccountSerializer(account).data)

        return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Delete request to delete accout object 
    def delete(self, request, pk, format=None):
        
        if not self.is_account_with_given_id(pk):
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        account = AccountModel.objects.get(id=pk)  
        account.delete()
        account.save()
        
        return Response(status=status.HTTP_200_OK)
        
# View Creating Account by post request
class CreateAccountView(APIView):
    serializer_class = CreateAccountSerializer
    
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


        
