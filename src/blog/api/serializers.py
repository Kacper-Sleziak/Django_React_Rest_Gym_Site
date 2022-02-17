from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from account.models import Account
from blog.models import BlogPost, Comment

class CreateBlogPostSerializer(ModelSerializer):  
    author = serializers.CharField(write_only=True)
    
    class Meta:
        model = BlogPost
        fields = ('title', 'body', 'tag', 'author', 'image', 'short')
    
    def save(self):
        print(self.validated_data)
        
        tilte = self.validated_data['title']
        body = self.validated_data['body']
        tag = self.validated_data['tag']
        image = self.validated_data['image']
        short = self.validated_data['short']
        
        author_nickname = self.validated_data['author']
        author = Account.objects.get(nickname = author_nickname)
        
        blog_post = BlogPost.objects.create(title=tilte, body=body, tag=tag, 
                                            image=image, short=short, author=author)
        blog_post.save()
        return blog_post

class BlogPostSerializer(ModelSerializer):    
    author = serializers.StringRelatedField()
    
    class Meta:
        model = BlogPost
        fields = ('title', 'body', 'short', 'tag', 'image', 'short', 
                  'released_date', 'last_update', 'slug', 'likes', 'author')

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
        
