from rest_framework.serializers import ModelSerializer
from blog.models import BlogPost, Comment

# to change author in serializer should be email
class CreateBlogPostSerializer(ModelSerializer):  
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
    # TO DO EXTEND SERIALIZER TO SHOW NICKNAME OF COMMENT AUTHOR NOT ID
    class Meta:
        model = Comment
        fields = ('body', 'author', 'likes', 'released_date', 
                'edited')
