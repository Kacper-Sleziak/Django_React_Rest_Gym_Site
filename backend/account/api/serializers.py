from django.contrib.auth import authenticate
from rest_framework import serializers

from account.models import Account
from account.validators import PasswordValidator


class LoginSerializer(serializers.Serializer):
    """
    This serializer defines two fields for authentication:
      * username
      * password.
    It will try to authenticate the user with when validated.
    """

    email = serializers.CharField(label="email", write_only=True)
    password = serializers.CharField(
        label="Password",
        # This will be used when the DRF browsable API is enabled
        style={"input_type": "password"},
        trim_whitespace=False,
        write_only=True,
    )

    def validate(self, attrs):
        # Take username and password from request
        email = attrs.get("email")
        password = attrs.get("password")

        if email and password:
            # Try to authenticate the user using Django auth framework.
            user = authenticate(
                request=self.context.get("request"), username=email, password=password
            )
            if not user:
                # If we don't have a regular user, raise a ValidationError
                msg = "Access denied: wrong username or password."
                raise serializers.ValidationError(msg, code="authorization")
        else:
            msg = 'Both "username" and "password" are required.'
            raise serializers.ValidationError(msg, code="authorization")
        # We have a valid user, put it in the serializer's validated_data.
        # It will be used in the view.
        attrs["user"] = user
        return attrs


# Serializer for most account's operations


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
    password = serializers.CharField(style={"input_type": "password"}, write_only=True)
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = Account
        fields = (
            "id",
            "email",
            "nickname",
            "first_name",
            "last_name",
            "date_joined",
            "last_login",
            "is_admin",
            "is_staff",
            "is_superuser",
            "is_active",
            "password",
            "password2",
        )

    def validate(self, data):
        password = data["password"]
        password2 = data["password2"]

        # Using custome validator
        password_validator = PasswordValidator(password=password)
        password_validator.validate(length=9, password2=password2)
        return data

    def save(self):
        account = Account(
            email=self.validated_data["email"], nickname=self.validated_data["nickname"]
        )
        password = self.validated_data["password"]
        account.set_password(password)
        account.save()
        return account


class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    password2 = serializers.CharField(required=True)

    # Validate check if old_password == password
    def validate(self, data):
        if not self.context["request"].user.check_password(data.get("old_password")):
            raise serializers.ValidationError({"old_password": "Wrong password."})

        password_validator = PasswordValidator(data.get("password"))
        password_validator.validate(8, data.get("password2"))

        return data

    def update(self, instance, validated_data):
        instance.set_password(validated_data["password"])
        instance.save()
        return instance

    @property
    def data(self):
        return {"Success": True}


class AccountChangeDataSerializer(serializers.Serializer):
    nickname = serializers.CharField(required=False)
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)

    # Validate check if in data base exsists user with given nickname
    def validate(self, data):
        if data.get("nickname"):
            nickname = data.get("nickname")
            if Account.objects.filter(nickname=nickname).exists():
                raise serializers.ValidationError(
                    {"nickname": f"There is a user with nickname {nickname}."}
                )

    def update(self, instance, validated_data):

        if "nickname" in validated_data:
            instance.nickname = validated_data["nickname"]

        if "first_name" in validated_data:
            instance.first_name = validated_data["first_name"]

        if "last_name" in validated_data:
            instance.last_name = validated_data["last_name"]

        instance.save()
        return instance

    @property
    def data(self):
        return {"Success": True}
