from django.urls import path
from blog.api.views.blogViews import (AllBlogPosts, CreateBlogPostView, BlogPostView, 
                                    blog_post_get, blog_post_get_all_posts_of_author)
from blog.api.views.commentsViews import CreateCommentView, CommentView, get_comments_of_blog_post
from blog.api.views.likeViews import like_blog_post_view

urlpatterns = [
    path('', AllBlogPosts.as_view()),
    path('create', CreateBlogPostView.as_view()),
    path('operations/<str:slug>', BlogPostView.as_view()),
    path('<str:slug>', blog_post_get),
    path('author/<str:email>/', blog_post_get_all_posts_of_author),
    path('comment/create/', CreateCommentView.as_view()),
    path('comment/<int:pk>', CommentView.as_view()),
    path('comment/<str:slug>/', get_comments_of_blog_post),
    path('like/blog-post', like_blog_post_view)
    ]
