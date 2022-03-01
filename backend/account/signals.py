from django.db.models.signals import post_save
from django.dispatch import receiver
from account.models import Account
from user_profile.models import User_profile
from rest_framework.authtoken.models import Token

# Create profile for new user 
@receiver(post_save, sender=Account)
def create_profile_for_user(sender, instance, created=False, *args, **kwargs):
    if created:
        new_user_profile = User_profile.objects.create(account=instance)
        new_user_profile.save()

# Create token for new user
@receiver(post_save, sender=Account)
def create_profile_for_user(sender, instance, created=False, *args, **kwargs):
    if created:
        Token.objects.create(user=instance)
    
    