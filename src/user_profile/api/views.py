from asyncio.windows_events import NULL
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from user_profile.models import User_profile
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from account.models import Account as AccountModel
from account.api.serializers import AccountSerializer
from user_profile.api.serializers import UserProfileSerializer


def get_user_with_given_nickname(nickname):
        queryset = AccountModel.objects.all().filter(nickname=nickname)
        if queryset.exists():
            return queryset[0]
        else:
            NULL
            
# [GET] Getting information of user profile with informations about account              
class GetUserProfile(APIView):        
    def get(self, request, nickname):
        user = get_user_with_given_nickname(nickname)
        if user != NULL:
            account_serializer = AccountSerializer(user)
            feedback_data = account_serializer.data
            user_profile = User_profile.objects.get(account=user)
            
            user_profile_serializer = UserProfileSerializer(user_profile)
            feedback_data['avatar'] = user_profile_serializer.data['avatar']
            feedback_data['description'] = user_profile_serializer.data['description']
            return Response(feedback_data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

# [PUT] Edit User Profile View
class EditUserProfile(APIView):
    serializer_class = UserProfileSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    
    def is_user_owner_of_profile(self, request, profile_author):
        user = request.user 
        
        if user == profile_author:
            return True
        else:
            return False
    
    def put(self, request, nickname):
        user = get_user_with_given_nickname(nickname)
        if user != NULL:
            user_profile = User_profile.objects.get(account=user)
            serializer = self.serializer_class(user_profile, data=request.data)
            if serializer.is_valid() and self.is_user_owner_of_profile(request, user):
                serializer.save()
                return Response(UserProfileSerializer(user_profile).data, status=status.HTTP_200_OK)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_404_NOT_FOUND)
            
        
