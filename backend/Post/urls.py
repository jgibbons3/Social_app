from django.urls import path
from .views import *


urlpatterns = [
    path('posts/', ListCreatePost.as_view()),
    path('posts/<int:post_id>/', RetrieveUpdateDeletePost.as_view()),
    path('posts/toggle-like/<int:post_id>/', ToggleLike.as_view()),
    path('posts/user/<int:user_id>/', AllPostPerUser.as_view()),
    path('posts/likes/', likedBy_User.as_view()),
    path('posts/following/', following_User.as_view()),
    path('comments/<int:post_id>/', comments_post.as_view()),
    path('comments/create/<int:post_id>/', comments_postId.as_view()),
    path('posts/friends/', PostOfFriends.as_view()),
    path('posts/list_posts/', CreatePost.as_view()),
    
]