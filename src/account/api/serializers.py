from rest_framework.serializers import ModelSerializer, CharField, ValidationError
import django.contrib.auth.password_validation as validators
from django.core.validators import EmailValidator
from account.models import Account
from account.validators import Validator

class LoginSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields = ('email' ,'password')
        extra_kwargs = {
            'email': {'validators': [EmailValidator,]},
        }

class AccountSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields = ('email', 'nickname', 'first_name', 'last_name', 'date_joined',
                'last_login', 'is_admin', 'is_staff', 'is_superuser')
        
class CreateAccountSerializer(ModelSerializer):
    
    password = CharField(style={'input_type': 'password'}, write_only=True)
    password2 = CharField(style={'input_type': 'password'}, write_only=True)
    
    class Meta:
        model = Account
        fields = ('nickname', 'email', 'password', 'password2')
        
    def validate(self, data):
        password = data['password']
        password2 = data['password2']
        
        validator = Validator(password=password)
        validator.are_password_same_validate(password2=password2)
        validator.min_len_validate(length=9)
        validator.numberal_validate()
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
         
class UpdateAccountSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields=('nickname', 'first_name', 'last_name')
