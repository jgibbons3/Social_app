from django.contrib.auth import get_user_model
from rest_framework import serializers
from User.models import Friendship

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'followers', 'image', 'like_post', 'first_name', 'last_name', 'city', 'country', 'about']
        # fields = '__all__'


class FriendshipSerializer(serializers.ModelSerializer):
    requester_user = UserSerializer(read_only=True)
    receiver_user = UserSerializer(read_only=True)
    class Meta:
        model = Friendship
        fields = '__all__'
        read_only_fields = ['requester_user']