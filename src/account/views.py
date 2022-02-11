from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
# Imports from project
from account.models import Account as AccountModel
from account.serializers import AccountSerializer, CreateAccountSerializer, UpdateAccountSerializer

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
            return Response(status=status.HTTP_204_NO_CONTENT)
        
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
            return Response(AccountSerializer(account).data, status=status.HTTP_200_OK)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
