from django.db import models
from django.conf import settings


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
    short = models.TextField(max_length=250, null=False, blank=False)
    tag = models.CharField(max_length=15, choices=TAG_CHOICES, null=False, blank=False, default='SPORT')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, null=False, blank=False, on_delete=models.CASCADE)
    released_date = models.DateTimeField(auto_now_add=True)
    last_update = models.DateField(auto_now=True)
    slug = models.SlugField(max_length=50, blank=True)
    image = models.ImageField(upload_to=image_upload_location, blank=False, null=False)
    likes = models.IntegerField(default=0, blank=True)
    
    def __str__(self):
        return self.title

# Model Of Comment
class Comment(models.Model):
    body = models.TextField(max_length=250, null=False, blank=False)
    likes = models.IntegerField(default=0, blank=True)
    released_date = models.DateTimeField(auto_now_add=True)
    edited = models.DateField(auto_now=True)
    author= models.ForeignKey(settings.AUTH_USER_MODEL, null=False, blank=False, 
                              on_delete=models.CASCADE, related_name='author')
    blog_post = models.ForeignKey(BlogPost, null=False, blank=False, on_delete=models.CASCADE)
    
    def __str__(self):
        str = f"'{self.blog_post.title}' from {self.author}"
        return  str
    
# Model of relation beetwen blog post and person who liked the post
class BlogLike(models.Model):
    blog_post = models.ForeignKey(BlogPost, null=False, blank=False, on_delete=models.CASCADE)
    liker = models.ForeignKey(settings.AUTH_USER_MODEL, null=False, blank=False, on_delete=models.CASCADE)

# Model of relation beetwen comment and person who liked the comment
class CommentLike(models.Model):
    comment = models.ForeignKey(Comment, null=False, blank=False, on_delete=models.CASCADE)
    liker = models.ForeignKey(settings.AUTH_USER_MODEL, null=False, blank=False, on_delete=models.CASCADE)
    