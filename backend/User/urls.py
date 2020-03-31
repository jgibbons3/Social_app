from django.urls import path
from .views import *


urlpatterns = [
    path('users/', ListUsers.as_view()),
    path('users/<int:user_id>/', ListUser.as_view()),
    path('social/followers/following/', following_User.as_view()),
    path('social/followers/followers/', followers_Users.as_view()),
    path('social/followers/toggle-follow/<int:user_id>/', ToggleFollow.as_view()),
    path('social/friends/requests/<int:friend_request_id>/', RetrieveUpdateDeleteFriendship.as_view()),
    path('social/friends/', AllPostPerUser.as_view()),
    path('users/me/', MyProfile.as_view()),
    path('social/friends/request/<int:user_id>/', CreateFriendRequest.as_view()),
]
