from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from blog.models import BlogPost, Comment

class CreateBlogPostSerializer(ModelSerializer):  
    author = serializers.StringRelatedField()
    
    class Meta:
        model = BlogPost
        fields = ('title', 'body', 'tag', 'author', 'image', 'short')
        
class BlogPostSerializer(ModelSerializer):    
    class Meta:
        model = BlogPost
        fields = ('title', 'body', 'short', 'tag', 'image', 'short', 
                  'released_date', 'last_update', 'slug', 'likes')

class CreateCommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = ('body', 'author', 'blog_post')

class CommentSerializer(ModelSerializer):
    author = serializers.StringRelatedField()
    
    class Meta:
        model = Comment
        fields = ('body', 'likes', 'released_date', 
                'edited', 'author')
        
