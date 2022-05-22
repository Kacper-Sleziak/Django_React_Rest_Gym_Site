from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser
# Imports from project
from blog.models import BlogPost as BlogPostModel
from account.models import Account as AccountModel
from blog.api.serializers import BlogPostSerializer, CreateBlogPostSerializer
from blog.api.pagination import BlogPostsPagination

# [GET] Blog Posts View


class AllBlogPosts(generics.ListAPIView):
    queryset = BlogPostModel.objects.all()
    serializer_class = BlogPostSerializer
    pagination_class = BlogPostsPagination

# [POST] Create Blog Post API View


class CreateBlogPostView(APIView):
    serializer_class = CreateBlogPostSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            new_blog_post = serializer.save()
            serializer = BlogPostSerializer(new_blog_post)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# [GET, PUT, DELETE] Blog Post API View


class BlogPostView(APIView):
    serializer_class = BlogPostSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

    def is_blog_post_with_given_slug(self, slug):
        queryset = BlogPostModel.objects.filter(slug=slug)
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

    def get(self, request, slug, format=None):
        if self.is_blog_post_with_given_slug(slug):
            blog_post = BlogPostModel.objects.get(slug=slug)

            return Response(
                BlogPostSerializer(blog_post).data,
                status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, slug, format=None):
        if not self.is_blog_post_with_given_slug(slug):
            return Response(status=status.HTTP_404_NOT_FOUND)

        blog_post = BlogPostModel.objects.get(slug=slug)
        serializer = self.serializer_class(blog_post, data=request.data)

        if serializer.is_valid():
            if self.is_user_author_of_blog_post:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug, format=None):
        if not self.is_blog_post_with_given_slug(slug):
            return Response(status=status.HTTP_404_NOT_FOUND)

        if self.is_user_author_of_blog_post:
            blog_post = BlogPostModel.objects.get(slug=slug)
            blog_post.delete()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

# [GET] Get all blog posts of author


class BlogPostsOfAuthor(generics.ListAPIView):
    serializer_class = BlogPostSerializer

    def get_queryset(self):
        nickname = self.kwargs['nickname']
        author = AccountModel.objects.get(nickname=nickname)
        return BlogPostModel.objects.all().filter(author=author)
