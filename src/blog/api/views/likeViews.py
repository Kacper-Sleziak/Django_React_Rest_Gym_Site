from asyncio.windows_events import NULL
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
# Imports from project
from blog.models import BlogPost as BlogPostModel, Comment as CommentModel
from blog.api.serializers import (BlogPostSerializer, CreateBlogPostSerializer, CommentSerializer, 
                              CreateCommentSerializer)

class LikeBlogPostView:
    pass

class UnLikeBlogPostView:
    pass

class LikeCommentView:
    pass

class UnLikeCommentView:
    pass