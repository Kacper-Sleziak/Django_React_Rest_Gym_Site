from rest_framework.serializers import ModelSerializer
from blog.models import BlogPost

class CreateBlogPostSerializer(ModelSerializer):    
    
    class Meta:
        model = BlogPost
        fields = ('title', 'body', 'tag', 'author', 'image')

class BlogPostSerializer(ModelSerializer):    
    
    class Meta:
        model = BlogPost
        fields = '__all__'
