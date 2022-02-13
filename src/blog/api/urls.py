from django.urls import path
from blog.api.views.blogViews import AllBlogPosts, CreateBlogPostView, BlogPostView
from blog.api.views.commentsViews import CreateCommentView, CommentView

urlpatterns = [
    path('', AllBlogPosts.as_view()),
    path('create/', CreateBlogPostView.as_view()),
    path('<int:pk>/', BlogPostView.as_view()),
    path('comment/create/', CreateCommentView.as_view()),
    path('comment/<int:pk>', CommentView.as_view())
    ]
