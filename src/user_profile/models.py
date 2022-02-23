from django.db import models
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import pre_delete

def avatar_upload_location(instance, filename):
    file_path = f"profile/{instance.account.email}/avatar/{filename}"
    
    return file_path

class User_profile(models.Model):
    description = models.CharField(max_length=250, null=True, blank=True)
    account = models.ForeignKey(settings.AUTH_USER_MODEL, null=False, blank=False, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to=avatar_upload_location, blank=True, null=True)
    
    def __str__(self):
        return f"profile of {self.account.email}"

# Delete avatar while deleting profile
@receiver(pre_delete, sender=User_profile)
def delete_avatar(sender, instance, *args, **kwargs):
    try:
        instance.avatar.delete(save=False)
    except:
        pass
