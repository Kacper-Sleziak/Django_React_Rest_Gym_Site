from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from user_profile.models import User_profile


class UserProfileSerializer(ModelSerializer):
    class Meta:
        model = User_profile
        fields = ('avatar', 'description')
