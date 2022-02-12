from django.db.models.signals import pre_delete, post_save
from django.dispatch import receiver
from account.models import Account, User_profile

# Before deleting user from data base, setting author of blog posts as Deleted User
@receiver(pre_delete, sender=Account)
def set_authors_of_post_as_deleted_user(sender, instance, *args, **kwargs):
    pass

# After creating user, creating profile for him
@receiver(post_save, sender=Account)
def create_profile_for_user(sender, instance, *args, **kwargs):
    new_user_profile = User_profile.objects.create(account=instance)
    new_user_profile.save()
    