from django.contrib import admin

from blog.models import BlogLike, BlogPost, Comment, CommentLike

admin.site.register(BlogPost)
admin.site.register(Comment)
admin.site.register(BlogLike)
admin.site.register(CommentLike)
