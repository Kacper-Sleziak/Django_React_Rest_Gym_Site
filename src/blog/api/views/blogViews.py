from asyncio.windows_events import NULL
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
# Imports from project
from blog.models import BlogPost as BlogPostModel
from account.models import Account as AccountModel
from blog.api.serializers import BlogPostSerializer, CreateBlogPostSerializer

# Blog Posts View [GET]
class AllBlogPosts(generics.ListAPIView):
    queryset = BlogPostModel.objects.all()
    serializer_class = BlogPostSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

# Create Blog Post API View [POST]
class CreateBlogPostView(APIView):
    serializer_class = CreateBlogPostSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
        
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = request.user
            
            # Only admin can create blog post
            if user.is_admin:
                new_blog_post = serializer.save()
                serializer = BlogPostSerializer(new_blog_post)
                response_data = append_author_fields_to_response(serializer.data, user)
                return Response(response_data, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_403_FORBIDDEN)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Blog Post API View [PUT, DELETE]
class BlogPostView(APIView):
    serializer_class = BlogPostSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def is_blog_post_with_given_id(self, pk):
        queryset = BlogPostModel.objects.filter(id=pk)
        if queryset.exists():
            return True
        else:
            return False
    
    # Only author can delete or edit his post
    def is_user_author_of_blog_post(request, blog_post):
        author = blog_post.author
        user = request.user        
        
        if author == user:
            return True
        else:
            return False
        
    def put(self, request, pk, format=None):
        if not self.is_blog_post_with_given_id(pk):
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        blog_post = BlogPostModel.objects.get(id=pk)
        serializer = self.serializer_class(blog_post, data=request.data)
        
        if serializer.is_valid():
            if self.is_user_author_of_blog_post:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk, format=None):
        if not self.is_blog_post_with_given_id(pk):
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        if self.is_user_author_of_blog_post:
            blog_post = BlogPostModel.objects.get(id=pk)
            blog_post.delete()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

# [GET] don't need to be protected with authorization 
@api_view(['GET', ])
def blog_post_get(request, slug):
    queryset = BlogPostModel.objects.filter(slug=slug) 
    
    if queryset.exists():
        blog_post = queryset[0]
        serializer = BlogPostSerializer(blog_post)
        response_data = append_author_fields_to_response(serializer.data, blog_post.author)
        return Response(response_data , status=status.HTTP_200_OK)
    return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET', ])
def blog_post_get_all_posts_of_author(request, email):
    queryset = AccountModel.objects.filter(email = email)
    
    if queryset.exists():
        author = queryset[0]
        author_id = author.id 
        queryset = BlogPostModel.objects.filter(author=author_id)
        if queryset.exists():  
            serializer = BlogPostSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_404_NOT_FOUND)

# Extend serialization by adding 2 fields to dict
def append_author_fields_to_response(serialized_data, user):
    email = user.email
    nickname = user.nickname
    serialized_data['author_email'] = email
    serialized_data['author_nickname'] = nickname
    
    return serialized_data