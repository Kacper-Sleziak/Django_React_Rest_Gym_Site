from django.db.models.signals import pre_save, pre_delete, post_save
from django.utils.text import slugify
from django.dispatch import receiver
from gym_site.settings import BASE_DIR
import os
from blog.models import BlogPost, BlogLike, CommentLike

# Handling slug creating 
@receiver(pre_save, sender=BlogPost)
def slug_adder(sender, instance, *args, **kwargs):
    unique_number = 2
    slug = slugify(instance.title)
    
    # Avoid changing slug while editing blog post object
    if instance.slug != slug:
        # Checking if in data base is blog post with same slug
        queryset = BlogPost.objects.all().filter(slug=slug)
        
        # Change slug if same exsits in data base
        if queryset.exists() :
            while queryset.exists():
                slug = slugify(instance.title + f"{unique_number}")
                queryset = BlogPost.objects.all().filter(slug=slug)
                unique_number += 1
        
        instance.slug = slug

# Handling deleting unnecessary folders and images 
@receiver(pre_delete, sender=BlogPost)
def delete_image_and_empty_folders(sender, instance, *args, **kwargs):
    
    author_image_blog_folder = os.path.join(BASE_DIR, "media_cdn", "blog", "blog_images", 
                                 f"{instance.author.email}")
    
    title_image_blog_folder = os.path.join(author_image_blog_folder, f"{instance.title}")   

    # Deleting post image
    instance.image.delete(save=False)
    
    # Deleting empty folders
    if(len(os.listdir(title_image_blog_folder ))==0):
        os.rmdir(title_image_blog_folder)
        
    if(len(os.listdir(author_image_blog_folder))==0):
        os.rmdir(author_image_blog_folder)
        
# Changing number of likes 
# object - instance of model with likes (BlogPost or Comment)
# likes_change - number of likes to add (for example 1 for like or -1 for unlike)
def LikesHandler(object, likes_change):

    likes = object.likes
    likes = likes + likes_change
    object.likes = likes
    object.save()
    
# Handling increasing number of likes of blog posts
@receiver(post_save, sender=BlogLike)
def LikeBlogPost(sender, instance, *args, **kwargs):
    LikesHandler(instance.blog_post, 1)

# Handling increasing number of likes of comment
@receiver(post_save, sender=CommentLike)
def LikeComment(sender, instance, *args, **kwargs):
    LikesHandler(instance.comments, 1)

# Handling decreasing number of likes of blog post
@receiver(pre_delete, sender=BlogLike)
def UnLikeBlogPost(sender, instance, *args, **kwargs):
    LikesHandler(instance.blog_post, -1)

# Handling decreasing number of likes of comment
@receiver(pre_delete, sender=CommentLike)
def UnLikeBlogPost(sender, instance, *args, **kwargs):
    LikesHandler(instance.comments, -1)