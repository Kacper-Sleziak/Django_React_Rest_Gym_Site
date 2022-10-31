from blog.api.views.blogViews import (
    AllBlogPosts,
    BlogPostsOfAuthor,
    BlogPostView,
    CreateBlogPostView,
)
from blog.api.views.commentsViews import (
    CommentsOfBlogPost,
    CommentView,
    CreateCommentView,
)
from blog.api.views.likeViews import like_blog_post_view
from django.urls import path

urlpatterns = [
    path("", AllBlogPosts.as_view()),
    path("list", AllBlogPosts.as_view()),
    path("create", CreateBlogPostView.as_view()),
    path("<str:slug>", BlogPostView.as_view()),
    path("author/<str:nickname>/", BlogPostsOfAuthor.as_view()),
    path("comment/create/", CreateCommentView.as_view()),
    path("comment/<int:pk>", CommentView.as_view()),
    path("comment/<str:slug>/", CommentsOfBlogPost.as_view()),
    path("like/blog-post", like_blog_post_view),
]
