from django.contrib import admin
from blog.models import BlogPost, Comment, BlogLike, CommentLike

admin.site.register(BlogPost)
admin.site.register(Comment)
admin.site.register(BlogLike)
admin.site.register(CommentLike)
