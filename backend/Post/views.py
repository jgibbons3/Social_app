from itertools import chain
from rest_framework import generics, filters
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, ListCreateAPIView, \
    RetrieveUpdateAPIView, DestroyAPIView, RetrieveUpdateDestroyAPIView, GenericAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from Post.serializers import PostSerializer, CommentSerializer
from Post.permissions import IsOwnerOfPostOrReadOnly
from User.serializers import UserSerializer, FriendshipSerializer
from .models import Post, Comment
from User.models import User, Friendship


# 1)api/social/posts/ POST: user can create a new post by sending post data. He should also be able to share another post.
# 2)api/social/posts/ GET: lists all the posts of all users in chronological order
# 3)api/social/posts/?search=<str:search_string> GET: Search posts of all users and list result in chronological order
class ListCreatePost(ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'content']

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


# 4)api/social/posts/<int:post_id>/ GET: get a specific post by ID and display all the information about that post
# 5)api/social/posts/<int:post_id>/ PATCH: update a specific post (only allow owner of post or admin)
# 6)api/social/posts/<int:post_id>/ DELETE: delete a post by ID (only allow owner of post or admin)
class RetrieveUpdateDeletePost(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_url_kwarg = "post_id"
    permission_classes = [IsAuthenticated, IsOwnerOfPostOrReadOnly]


# 7)api/social/posts/user/<int:user_id>/ GET: lists all the posts of a specific user in chronological order
class AllPostPerUser(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        username = self.kwargs['user_id']
        return Post.objects.filter(owner_id=username)


# 8)api/social/posts/following/ GET: lists all the posts of followed users in chronological order
class following_User(generics.ListAPIView):
    serializer_class = PostSerializer
    def get_queryset(self):
        followed_people=self.request.user.followees.all()  # filter the users im following
        posts = []  # create an empty list to append the posts of the users im following
        for followeduser in followed_people: # loop the users im following
            result = followeduser.posts.all() #get the posts of each user im following
            posts=list(chain(posts, result)) # append with chain, and turn into a list
        return posts


# 9)api/social/posts/friends/ GET: lists all the posts of the logged in user’s friends in chronological order
class PostOfFriends(generics.ListAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def get_queryset(self):
        send_friend_requests = Friendship.objects.filter(requester_user_id=self.request.user,friendship_status='accept')
        send_friend_requests_id = [friend_request.receiver_user.id for friend_request in send_friend_requests]

        received_friend_requests = Friendship.objects.filter(receiver_user_id=self.request.user,friendship_status='accept')
        received_friend_requests_id = [friend_request.requester_user.id for friend_request in received_friend_requests]

        friend_user_ids = send_friend_requests_id + received_friend_requests_id
        return Post.objects.filter(owner_id__in=friend_user_ids)


# 10)api/social/posts/toggle-like/int:post_id>/ POST: Toggle like a post
class ToggleLike(GenericAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    lookup_field = 'post_id'

    def post(self, request, post_id):
        post = get_object_or_404(Post, id=post_id)
        result = post.like_by.filter(username=request.user)
        if result:
            post.like_by.remove(request.user)
            return Response("Unliked")
        else:
            post.like_by.add(request.user)
            return Response("Liked")


# 11)api/social/posts/likes/ GET: the list of the posts the user likes
class likedBy_User(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(like_by=self.request.user)


# COMMENTS
# 1)api/social/comments/<int:post_id>/ POST: Create a new comment on a post.
# 2)api/social/comments/<int:post_id>/ GET: List all comments of a post
class comments_postId(ListCreateAPIView):
    serializer_class = CommentSerializer
    lookup_url_kwarg = "post_id"

    def get_queryset(self):
        post_id = self.kwargs['post_id']
        return Comment.objects.filter(comment_post=post_id)

    def perform_create(self, serializer):
        post_id = self.kwargs['post_id']
        serializer.save(comment_owner=self.request.user, comment_post_id=post_id) # comment_post_id to get the post_id directly
