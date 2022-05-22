from asyncore import read
from importlib.metadata import requires
from rest_framework import serializers
from django.core.validators import EmailValidator
from account.models import Account
from account.validators import PasswordValidator


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('email', 'password')
        extra_kwargs = {
            'email': {'validators': [EmailValidator, ]},
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
    password = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = Account
        fields = (
            'id',
            'email',
            'nickname',
            'first_name',
            'last_name',
            'date_joined',
            'last_login',
            'is_admin',
            'is_staff',
            'is_superuser',
            'is_active',
            'password',
            'password2')

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


class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    password2 = serializers.CharField(required=True)

    def validate(self, data):
        if not self.context['request'].user.check_password(
                data.get('old_password')):
            raise serializers.ValidationError(
                {'old_password': 'Wrong password.'})

        password_validator = PasswordValidator(data.get('password'))
        password_validator.validate(8, data.get('password2'))

        return data

    def update(self, instance, validated_data):
        instance.set_password(validated_data['password'])
        instance.save()
        return instance

    @property
    def data(self):
        return {'Success': True}


class AccountChangeDataSerializer(serializers.Serializer):
    nickname = serializers.CharField(required=False)
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)

    def validate(self, data):
        if data.get('nickname'):
            nickname = data.get('nickname')
            if Account.objects.filter(nickname=nickname).exists():
                raise serializers.ValidationError(
                    {'nickname': f'There is a user with nickname {nickname}.'})

        if data.get('last_name'):
            last_name = data.get('last_name')
            if Account.objects.filter(last_name=last_name).exists():
                raise serializers.ValidationError(
                    {'last_name': f'There is a user with last name {last_name}.'})

        if data.get('first_name'):
            first_name = data.get('first_name')
            if Account.objects.filter(first_name=first_name).exists():
                raise serializers.ValidationError(
                    {'last_name': f'There is a user with last name {first_name}.'})

    def update(self, instance, validated_data):
        print(validated_data)

        if 'nickname' in validated_data:
            instance.nickname = validated_data['nickname']

        if 'first_name' in validated_data:
            instance.first_name = validated_data['first_name']

        if 'last_name' in validated_data:
            instance.last_name = validated_data['last_name']

        instance.save()
        return instance

    @property
    def data(self):
        return {'Success': True}
