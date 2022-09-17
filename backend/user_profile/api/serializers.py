from rest_framework import serializers
from user_profile.models import User_profile


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_profile
        fields = ('avatar', 'description')
