from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('account/', include('account.api.urls')),
    path('blog/', include('blog.api.urls')),
    path('user_profile/', include('user_profile.api.urls')),
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
