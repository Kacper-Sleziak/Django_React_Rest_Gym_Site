from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/account/', include('account.api.urls')),
    path('api/blog/', include('blog.api.urls')),
    path('', include('frontend.urls')),   
    path('api/user_profile/', include('user_profile.api.urls'))
]

