from asyncore import read
from rest_framework import serializers
from django.core.validators import EmailValidator
from account.models import Account
from account.validators import PasswordValidator

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('email' ,'password')
        extra_kwargs = {
            'email': {'validators': [EmailValidator,]},
        }

class AccountSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    first_name = serializers.CharField(read_only=True)
    last_name = serializers.CharField(read_only=True)
    date_joined = serializers.CharField(read_only=True)
    last_login = serializers.CharField(read_only=True)
    is_admin = serializers.CharField(read_only=True)
    is_active = serializers.CharField(read_only=True)
    is_staff = serializers.CharField(read_only=True)
    is_superuser = serializers.CharField(read_only=True)
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    
    class Meta:
        model = Account
        fields = ('id', 'email', 'nickname', 'first_name', 'last_name', 'date_joined',
                'last_login', 'is_admin', 'is_staff', 'is_superuser', 'password', 'password2')
        
    def validate(self, data):
        password = data['password']
        password2 = data['password2']
    
        # Using custome validator
        password_validator = PasswordValidator(password=password)
        password_validator.validate(length=9, password2=password2)
        return data
            
    def save(self):
        account = Account(
            email=self.validated_data['email'],
            nickname=self.validated_data['nickname']
        )
        password = self.validated_data['password']
        account.set_password(password)
        account.save()
        return account
        
# class CreateAccountSerializer(serializers.ModelSerializer):
    
#     password = CharField(style={'input_type': 'password'}, write_only=True)
#     password2 = CharField(style={'input_type': 'password'}, write_only=True)
    
#     class Meta:
#         model = Account
#         fields = ('nickname', 'email', 'password', 'password2')
        
#     def validate(self, data):
#         password = data['password']
#         password2 = data['password2']
        
#         # Using custome validator
#         password_validator = PasswordValidator(password=password)
#         password_validator.validate(length=9, password2=password2)
#         return data
        
#     def save(self):
#         account = Account(
#             email=self.validated_data['email'],
#             nickname=self.validated_data['nickname']
#         )
#         password = self.validated_data['password']
#         account.set_password(password)
#         account.save()
#         return account
         
# class UpdateAccountSerializer(ModelSerializer):
#     class Meta:
#         model = Account
#         fields=('nickname', 'first_name', 'last_name')
