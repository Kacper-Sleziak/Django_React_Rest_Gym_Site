from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
# Imports from project
from blog.models import BlogPost, Comment as CommentModel
from blog.api.serializers import (CommentSerializer, CreateCommentSerializer)
from blog.api.pagination import CommentsPagination

# [POST] Create comment API View


class CreateCommentView(APIView):
    serializer_class = CreateCommentSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            new_comment = serializer.save()
            return Response(
                CommentSerializer(new_comment).data,
                status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# [PUT, DELETE] API comment View


class CommentView(APIView):
    serializer_class = CommentSerializer

    def get_comment(self, pk):
        queryset = CommentModel.objects.filter(id=pk)

        if queryset.exists():
            comment = queryset[0]
            return comment
        else:
            return 0

    def is_user_author_of_comment(request, comment):
        user = request.user
        author = comment.author

        if user == author:
            return True
        else:
            return False

    def put(self, request, pk, format=None):
        comment = self.getComment == 0
        if comment:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            if self.is_user_author_of_comment(request, comment):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        comment = self.getComment == 0
        if comment:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if self.is_user_author_of_comment(request, comment):
            comment.delete()
            comment.save()
            return Response(tatus=status.HTTP_200_OK)
        else:
            return Response(stauts=status.HTTP_403_FORBIDDEN)

# [GET] Returning all comments of blog post


class CommentsOfBlogPost(generics.ListAPIView):
    serializer_class = CommentSerializer
    pagination_class = CommentsPagination

    def get_queryset(self):
        slug = self.kwargs['slug']
        blog_post = BlogPost.objects.get(slug=slug)
        return CommentModel.objects.all().filter(blog_post=blog_post)
