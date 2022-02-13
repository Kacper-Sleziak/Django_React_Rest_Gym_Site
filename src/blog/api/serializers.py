from rest_framework.serializers import ModelSerializer
from blog.models import BlogPost, Comment

class CreateBlogPostSerializer(ModelSerializer):    
    class Meta:
        model = BlogPost
        fields = ('title', 'body', 'tag', 'author', 'image', 'short')

class BlogPostSerializer(ModelSerializer):    
    class Meta:
        model = BlogPost
        fields = '__all__'

class CreateCommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = ('body', 'author', 'blog_post')

class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
