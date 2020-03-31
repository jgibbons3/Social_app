from django.contrib import admin
from django.urls import path
from _ast import arg
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from django.conf import settings
from django.conf.urls.static import static


mypatterns = [
    path('admin/', admin.site.urls),
    path('social/', include('Post.urls')),
    path('', include('User.urls')),
    # api/auth/token/ POST: Get a new JWT by passing email/username and password
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api-auth/', include('rest_framework.urls')),
    #api/auth/token/refresh/ POST: Get a new JWT by passing an old still valid refresh token.
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # api/auth/token/verify/ POST: Verify a token by passing the access token
    path('auth/token/verify/', TokenVerifyView.as_view()),
] 

urlpatterns = [
    path('api/', include(mypatterns))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)