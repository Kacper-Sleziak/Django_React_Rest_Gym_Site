from asyncio.windows_events import NULL
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
# Imports from project
from blog.models import BlogPost as BlogPostModel, Comment as CommentModel
from blog.api.serializers import (BlogPostSerializer, CreateBlogPostSerializer, CommentSerializer, 
                              CreateCommentSerializer)

#API create comment View [POST]
class CreateCommentView(APIView):
    serializer_class = CreateCommentSerializer
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            new_comment = serializer.save()
            return Response(CommentSerializer(new_comment).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# API comment View [GET PUT DELETE]
class CommentView(APIView):
    serializer_class = CommentSerializer
    
    def getComment(self, pk):
        queryset = CommentModel.objects.filter(id=pk)
        
        if queryset.exists():
            comment = queryset[0]
            return comment
        else:
            return NULL
    
    def get(self, request, pk, format=None):
        
        comment = self.getComment(pk)
        
        if comment == NULL:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.serializer_class(comment)
        return Response(serializer.data, status=status.HTTP_200_OK)
            
    def put(self, request, pk, format=None):
        comment = self.getComment == NULL
        if comment:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk, format=None):
        comment = self.getComment == NULL
        if comment:
            return Response(status=status.HTTP_404_NOT_FOUND)
        comment.delete()
        comment.save()
        
        return Response(tatus=status.HTTP_200_OK)
    
class GetCommentsOfAuthorsBlogPostView(APIView):
    pass