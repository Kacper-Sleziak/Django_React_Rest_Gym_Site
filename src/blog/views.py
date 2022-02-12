from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from account import serializers
from rest_framework.parsers import MultiPartParser, FormParser
# Imports from project
from blog.models import BlogPost as BlogPostModel, Comment as CommentModel
from blog.serializers import (BlogPostSerializer, CreateBlogPostSerializer, CommentSerializer, 
                              CreateCommentSerializer)

# --- BLOG POSTS VIEWS ---

# Get All Blog Posts API View
class AllBlogPosts(generics.ListAPIView):
    queryset = BlogPostModel.objects.all()
    serializer_class = BlogPostSerializer

# Create Blog Post API View
class CreateBlogPostView(APIView):
    serializer_class = CreateBlogPostSerializer
    parser_classes = [MultiPartParser, FormParser]
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            new_blog_post = serializer.save()
            return Response(BlogPostSerializer(new_blog_post).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# API View for get, put and delete blog post
class BlogPostView(APIView):
    serializer_class = BlogPostSerializer
    
    def is_blog_post_with_given_id(self, pk):
        queryset = BlogPostModel.objects.filter(id=pk)
        if queryset.exists():
            return True
        else:
            return False
        
    def get(self, request, pk, format=None):
        if not self.is_blog_post_with_given_id(pk):
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        blog_post = BlogPostModel.objects.get(id=pk)
        serializer = self.serializer_class(blog_post)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    def put(self, request, pk, format=None):
        if not self.is_blog_post_with_given_id(pk):
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        blog_post = BlogPostModel.objects.get(id=pk)
        serializer = self.serializer_class(blog_post, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    
    def delete(self, request, pk, format=None):
        if not self.is_blog_post_with_given_id(pk):
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        blog_post = BlogPostModel.objects.get(id=pk)
        blog_post.delete()
        
        return Response(status=status.HTTP_200_OK)

class GetAllBlogPostsOfAuthor(APIView):
    pass

# --- COMMENTS VIEWS ---

# Create Comment API View
class CreateCommentView(APIView):
    serializer_class = CreateCommentSerializer
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            new_comment = serializer.save()
            return Response(CommentSerializer(new_comment).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class CommentView(APIView):
    def get(self, request, pk, format=None):
        pass
    
    def put(self, request, pk, format=None):
        pass
    
    def delete(self, request, pk, format=None):
        pass
    
class GetCommentsOfAuthorsBlogPostView(APIView):
    pass