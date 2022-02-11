from cmath import acos
import email
from rest_framework.serializers import ModelSerializer
from account.models import Account
from django.contrib.auth.hashers import make_password


class AccountSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'

class CreateAccountSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields = ('nickname', 'email', 'password')
    
    def create(self, validated_data):
        email = validated_data.get('email')
        nickname = validated_data.get('nickname')
        password = make_password(validated_data.get('password'))

        return Account.objects.create(email=email, nickname=nickname, password=password)
        
class UpdateAccountSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields=('nickname', 'first_name', 'last_name')
    
    def update(self, account, validated_data):  
        account.first_name = validated_data.get('first_name')
        account.last_name = validated_data.get('last_name')
        account.nickname= validated_data.get('nickname')
        account.save()
        
        return account



        
    
