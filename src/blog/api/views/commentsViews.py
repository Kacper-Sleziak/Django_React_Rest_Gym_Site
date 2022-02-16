from asyncio.windows_events import NULL
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from blog.api.views.blogViews import blog_post_get
# Imports from project
from blog.models import BlogPost, Comment as CommentModel
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from blog.api.serializers import (CommentSerializer, CreateCommentSerializer)

#API create comment View [POST]
class CreateCommentView(APIView):
    serializer_class = CreateCommentSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            new_comment = serializer.save()
            return Response(CommentSerializer(new_comment).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# API comment View [GET, DELETE]
class CommentView(APIView):
    serializer_class = CommentSerializer
    
    def get_comment(self, pk):
        queryset = CommentModel.objects.filter(id=pk)
        
        if queryset.exists():
            comment = queryset[0]
            return comment
        else:
            return NULL
    
    def is_user_author_of_comment(request, comment):
        user = request.user
        author = comment.author
        
        if user == author:
            return True
        else:
            return False
                
    def put(self, request, pk, format=None):
        comment = self.getComment == NULL
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
        comment = self.getComment == NULL
        if comment:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if self.is_user_author_of_comment(request, comment):
            comment.delete()
            comment.save()
            return Response(tatus=status.HTTP_200_OK)
        else:
            return Response(stauts=status.HTTP_403_FORBIDDEN)
    
@api_view(['GET', ])
def get_comments_of_blog_post(request, slug):
    queryset = BlogPost.objects.filter(slug=slug)
    if queryset.exists():
        blog_post = queryset[0]
        queryset = CommentModel.objects.filter(blog_post = blog_post)
        
        if queryset.exists():
            serializer = CommentSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_404_NOT_FOUND)
