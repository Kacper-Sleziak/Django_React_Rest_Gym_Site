from django.urls import path
from blog.views import AllBlogPosts, CreateBlogPostView, BlogPostView, CreateCommentView
urlpatterns = [
    path('', AllBlogPosts.as_view()),
    path('create/', CreateBlogPostView.as_view()),
    path('<int:pk>/', BlogPostView.as_view()),
    path('comment/create/', CreateCommentView.as_view())  
    ]
