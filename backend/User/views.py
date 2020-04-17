from django.db.models import Q
from rest_framework import generics, filters
from rest_framework.generics import CreateAPIView, ListCreateAPIView, \
    RetrieveUpdateDestroyAPIView, GenericAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from Post.permissions import IsOwnerOfPostOrReadOnly
from User.serializers import UserSerializer, FriendshipSerializer
from .models import User, Friendship
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser
from rest_framework.decorators import parser_classes
from rest_framework import viewsets


# 1)api/social/followers/toggle-follow/<int:user_id>/ POST: Toggle follow/unfollow a user
class ToggleFollow(GenericAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = 'user_id'

    def post(self, request, user_id):
        user = get_object_or_404(User, id=user_id)
        result = user.followers.filter(username=request.user)
        if result:
            user.followers.remove(request.user)
            return Response("Unfollow")
        else:
            user.followers.add(request.user)
            return Response("Follow")


# 2)api/social/followers/followers/ GET: List of all the logged in user’s followers
class followers_Users(generics.ListAPIView):
    serializer_class = UserSerializer
    def get_queryset(self):
        followers_people=self.request.user.followers.all()  # filter the users im following
        return followers_people


# 3)api/social/followers/following/ GET: List of all the people the current logged in user is following
class following_User(generics.ListAPIView):
    serializer_class = UserSerializer
    def get_queryset(self):
        followed_people=self.request.user.followees.all()  # filter the users im following
        return followed_people


# 4)api/social/friends/request/<int:user_id>/ POST: Send friend request to another user
class CreateFriendRequest(CreateAPIView):
    serializer_class = FriendshipSerializer
    permission_classes = [IsAuthenticated, IsOwnerOfPostOrReadOnly]
    lookup_url_kwarg = "user_id"

    def post(self, request, *args, **kwargs):
        receiver_id = kwargs["user_id"]
        receiver = User.objects.get(id=receiver_id)
        if self.request.user.username != receiver.username:
            friend_request, created = Friendship.objects.get_or_create(requester_user=self.request.user, receiver_user=receiver)
        return Response('friend request sent')


# 5)api/social/friends/requests/<int:friend_request_id>/ PATCH: Accept or Reject an open friend request
# 6)api/social/friends/requests/<int:friend_request_id>/ DELETE: Delete a friend request
class RetrieveUpdateDeleteFriendship(RetrieveUpdateDestroyAPIView):
    queryset = Friendship.objects.all()
    serializer_class = FriendshipSerializer
    lookup_url_kwarg = "friend_request_id"
    permission_classes = [IsAuthenticated, IsOwnerOfPostOrReadOnly]


# 7)api/social/friends/ GET: List all accepted friends
class AllPostPerUser(generics.ListAPIView):
    serializer_class = FriendshipSerializer
    permission_classes = [IsAuthenticated, IsOwnerOfPostOrReadOnly]

    def get_queryset(self):
        return Friendship.objects.filter(
            Q(requester_user_id=self.request.user) & Q(friendship_status='accept') |
            Q(receiver_user_id=self.request.user) & Q(friendship_status='accept'))

        # return Friendship.objects.filter(requester_user_id=self.request.user, friendship_status='accept')

# 8)api/social/friends_requests/ GET: List all pending friend requests 
class AllPendingFriendRequests(generics.ListAPIView):
    serializer_class = FriendshipSerializer
    permission_classes = [IsAuthenticated, IsOwnerOfPostOrReadOnly]

    def get_queryset(self):
        return Friendship.objects.filter(
            Q(requester_user_id=self.request.user) & Q(friendship_status='pending') |
            Q(receiver_user_id=self.request.user) & Q(friendship_status='pending'))

# 9)api/users/ GET: Get all the users
# 10)api/users/?search=<str:search_string> GET: Search users
class ListUsers(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['username']


# 11)api/users/<int:user_id>/ GET: Get specific user profile
class ListUser(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_url_kwarg = "user_id"


# ME
# 1)api/users/me/ GET: Get logged in user’s profile
# 2)api/users/me/ POST: Update the logged in user’s profile public info
@parser_classes([JSONParser, FormParser, MultiPartParser])
class MyProfile(viewsets.ViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsOwnerOfPostOrReadOnly]

    def get_queryset(self):
        return User.objects.filter(username=self.request.user)

    def update(self, request, pk=None):
        user = User.objects.get(username=self.request.user)
        for key in request.data.keys():
            setattr(user, key, request.data[key])
        user.save()
        return Response(UserSerializer(user).data)

    def retrieve(self, request):
        return Response(UserSerializer(request.user).data)
      

