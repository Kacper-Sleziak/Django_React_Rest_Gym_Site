from django.urls import path
from blog.api.views.blogViews import (AllBlogPosts, CreateBlogPostView, BlogPostView, 
                                    blog_post_get, blog_post_get_all_posts_of_author)
from blog.api.views.commentsViews import CreateCommentView, CommentView

urlpatterns = [
    path('', AllBlogPosts.as_view()),
    path('create', CreateBlogPostView.as_view()),
    path('<int:pk>', BlogPostView.as_view()),
    path('comment/create/', CreateCommentView.as_view()),
    path('comment/<int:pk>', CommentView.as_view()),
    path('<str:slug>/', blog_post_get),
    path('author/<str:email>/', blog_post_get_all_posts_of_author)
    ]
