from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/account/', include('account.api.urls')),
    path('api/blog/', include('blog.api.urls')),  
    path('api/user_profile/', include('user_profile.api.urls'))
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

