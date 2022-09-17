from account.models import Account
from blog.api.serializers import BlogLikeSerializer, CommentLikeSerializer
from blog.models import BlogLike, BlogPost, Comment, CommentLike
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


@permission_classes((IsAuthenticated,))
@api_view(['POST', 'GET', ])
def like_blog_post_view(request):
    if request.method == 'POST':
        serializer = BlogLikeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            if serializer.errors:
                return Response(
                    serializer.errors,
                    stauts=status.HTTP_226_IM_USED)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        serializer = BlogLikeSerializer(data=request.data)
        if serializer.is_valid():
            blog_post_slug = serializer.validated_data['blog_post']
            liker_nickname = serializer.validated_data['liker']

            blog_post = BlogPost.objects.get(slug=blog_post_slug)
            liker = Account.objects.get(nickname=liker_nickname)
            queryset = BlogLike.objects.filter(
                liker=liker, blog_post=blog_post)

            if queryset.exists():
                return Response(
                    BlogLikeSerializer(
                        request.data),
                    status=status.HTTP_200_OK)
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(stauts=status.HTTP_400_BAD_REQUEST)


@permission_classes((IsAuthenticated,))
@api_view(['DELETE', 'POST', ])
def like_comment_view(request):
    if request.method == 'POST':
        serializer = CommentLikeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            if serializer.errors:
                return Response(
                    serializer.errors,
                    stauts=status.HTTP_226_IM_USED)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        serializer = CommentLikeSerializer(data=request.data)
        if serializer.is_valid():
            comment_id = serializer.validated_data['comment']
            liker_nickname = serializer.validated_data['liker']

            comment = Comment.objects.get(id=comment_id)
            liker = Account.objects.get(nickname=liker_nickname)
            queryset = CommentLike.objects.filter(liker=liker, comment=comment)

            if queryset.exists():
                return Response(
                    CommentLikeSerializer(
                        request.data),
                    status=status.HTTP_200_OK)
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(stauts=status.HTTP_400_BAD_REQUEST)
