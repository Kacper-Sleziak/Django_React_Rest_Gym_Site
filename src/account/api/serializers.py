from rest_framework.serializers import ModelSerializer, CharField, ValidationError
from django.core.validators import EmailValidator
from account.models import Account

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
    
    def save(self):
        account = Account(
            email=self.validated_data['email'],
            nickname=self.validated_data['nickname']
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        if password != password2:
            raise ValidationError({'password': 'Passwords are not the same.'})
        # TO DO EXTENDED PASSWORD VALIDATION
        account.set_password(password)
        account.save()
        return account
    
    def validate(self, attrs):
        return super().validate(attrs)
    
class UpdateAccountSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields=('nickname', 'first_name', 'last_name')
