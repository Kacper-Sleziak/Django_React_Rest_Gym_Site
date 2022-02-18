from django.forms import ValidationError
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from account.models import Account
from blog.models import BlogLike, BlogPost, Comment, CommentLike

class CreateBlogPostSerializer(ModelSerializer):  
    author = serializers.CharField(write_only=True)
    
    class Meta:
        model = BlogPost
        fields = ('title', 'body', 'tag', 'author', 'image', 'short')
    
    def save(self):
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
        
class BlogLikeSerializer(ModelSerializer):
    liker = serializers.CharField(write_only=True)
    blog_post = serializers.CharField(write_only=True)
    
    class Meta:
        model = BlogLike
        fields = ('blog_post', 'liker')
    
    def save(self):
        blog_post_slug = self.validated_data['blog_post']
        comment_author_nickname = self.validated_data['liker']
        blog_post = BlogPost.objects.get(slug=blog_post_slug)
        liker = Account.objects.get(nickname=comment_author_nickname) 
        
        queryset = BlogLike.objects.filter(blog_post=blog_post, liker=liker)
        
        # When blog post is arleady liked by user we delete that ,,like"
        if queryset.exists():
            blog_like = queryset[0]
            blog_like.delete()
        
        # When user want to like the post
        else:      
            blog_like = BlogLike.objects.create(blog_post=blog_post, liker=liker)
    
class CommentLikeSerializer(ModelSerializer):
    liker = serializers.CharField(write_only=True)
    comment = serializers.CharField(write_only=True)
    
    class Meta:
        model = CommentLike
        fields = ('comment', 'liker')
    
        def save(self):
            comment_id = self.validated_data['comment']
            comment_author_nickname = self.validated_data['liker']
            comment = Comment.objects.get(id=comment_id)
            liker = Account.objects.get(nickname=comment_author_nickname) 
            
            queryset = CommentLike.objects.filter(comment=comment, liker=liker)
            
            # When blog post is arleady liked by user we delete that ,,like"
            if queryset.exists():
                comment_like = queryset[0]
                comment_like.delete()
            
            # When user want to like the post
            else:      
                comment_like = CommentLike.objects.create(comment=comment, liker=liker)
        
