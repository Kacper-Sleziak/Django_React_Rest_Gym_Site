from django.db.models.signals import pre_delete, post_save
from django.conf import settings
from django.dispatch import receiver
from account.models import Account
from user_profile.models import User_profile
from rest_framework.authtoken.models import Token

# Before deleting user from data base, setting author of blog posts as Deleted User
@receiver(pre_delete, sender=Account)
def set_authors_of_post_as_deleted_user(sender, instance, *args, **kwargs):
    pass

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
    
    