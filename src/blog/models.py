from django.db import models
from django.db.models.signals import pre_save, pre_delete
from django.utils.text import slugify
from django.conf import settings
from django.dispatch import receiver


TAG_CHOICES = (
    ('SPORT', 'SPORT'),
    ('DIET', 'DIET'),
    ('HEALTH', 'HEALTH'),
    ('LIFESTYLE', 'LIFESTYLE'),
)

def image_upload_location(instance, filename):
    file_path = f"blog/blog_images/{instance.author.email}/{instance.title}/{filename}"
    
    return file_path

# Model Of Blog Post
class BlogPost(models.Model):
    title = models.CharField(max_length=50, null=False, blank=False)
    body = models.TextField(max_length=5000, null=False, blank=False)
    tag = models.CharField(max_length=15, choices=TAG_CHOICES, null=False, blank=False, default='SPORT')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, null=False, blank=False, on_delete=models.CASCADE)
    released_date = models.DateTimeField(auto_now_add=True)
    last_update = models.DateField(auto_now=True)
    slug = models.SlugField(max_length=50, blank=True)
    image = models.ImageField(upload_to=image_upload_location, blank=True)
    likes = models.IntegerField(default=0, blank=True)
    
    def __str__(self):
        return self.title

# Model Of Comment
class Comment(models.Model):
    body = models.TextField(max_length=250, null=False, blank=False)
    likes = models.IntegerField(default=0, blank=True)
    released_date = models.DateTimeField(auto_now_add=True)
    edited = models.DateField(auto_now=True)
    author= models.ForeignKey(settings.AUTH_USER_MODEL, null=False, blank=False, on_delete=models.CASCADE)
    blog_post = models.ForeignKey(BlogPost, null=False, blank=False, on_delete=models.CASCADE)

# Handling slug create
@receiver(pre_save, sender=BlogPost)
def slug_adder(sender, instance, *args, **kwargs):
    unique_number = 2
    slug = slugify(instance.title)
    
    # Checking if in data base is blog post with same slug
    queryset = BlogPost.objects.all().filter(slug=slug)
    
    # Change slug if same exsits in data base
    if queryset.exists():
        while queryset.exists():
            slug = slugify(instance.title + unique_number)
            queryset = BlogPost.objects.all().filter(slug=slug)
            unique_number += 1
    
    instance.slug = slug
    
@receiver(pre_delete, sender=BlogPost)
def delete_image(sender, instance, *args, **kwargs):
    try:
        instance.image.delete(save=False)
    except:
        pass

    


        
        
        
    
    
    
    