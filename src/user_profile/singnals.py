from django.dispatch import receiver
from django.db.models.signals import pre_delete, pre_save
from user_profile. models import User_profile
from gym_site.settings import BASE_DIR
import os

# Delete avatar while deleting profile
@receiver(pre_delete, sender=User_profile)
def delete_avatar(sender, instance, *args, **kwargs):
    instance.avatar.delete(save=False)
    
    user_email = instance.account.email
    avatar_dir = os.path.join(BASE_DIR, "media_cdn", "profile", user_email)
    os.rmdir(avatar_dir)

# Deleting old avatars from folder
@receiver(pre_save, sender=User_profile)
def change_avatar(sender, instance, *args, **kwargs):
    user_email = instance.account.email
    avatar_dir = os.path.join(BASE_DIR, "media_cdn", "profile", user_email, "avatar")
    
    if os.path.isdir(avatar_dir):
        for file in os.listdir(avatar_dir):
            if file.__str__ != f"{instance.avatar}":
                os.remove(os.path.join(avatar_dir, file))