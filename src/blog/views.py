from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from account import serializers
from rest_framework.parsers import MultiPartParser, FormParser
# Imports from project
from blog.models import BlogPost as BlogPostModel
from blog.serializers import BlogPostSerializer, CreateBlogPostSerializer

class AllBlogPosts(generics.ListAPIView):
    queryset = BlogPostModel.objects.all()
    serializer_class = BlogPostSerializer

class CreateBlogPostView(APIView):
    serializer_class = CreateBlogPostSerializer
    parser_classes = [MultiPartParser, FormParser]
    
    def post(self, request, format=None):
        serializer = BlogPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
        pass
    
    def delete(self, request, pk, format=None):
        if not self.is_blog_post_with_given_id(pk):
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        blog_post = BlogPostModel.objects.get(id=pk)
        blog_post.delete()
        
        return Response(status=status.HTTP_200_OK)
        