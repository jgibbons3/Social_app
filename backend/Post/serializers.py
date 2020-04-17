from rest_framework import serializers
from User.serializers import UserSerializer
from .models import Post, Comment

class PostSerializer(serializers.ModelSerializer):
    owner = UserSerializer()
    total_likes = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ['owner']

    def get_total_likes(self, post):
        return post.like_by.count()


class PostCreateSerializer(serializers.ModelSerializer):
    # owner = UserSerializer()
    total_likes = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = '__all__'
        # read_only_fields = ['owner']

    def get_total_likes(self, post):
        return post.like_by.count()


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ['comment_owner']

class CommentUserSerializer(serializers.ModelSerializer):
    comment_owner = UserSerializer()

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ['comment_owner']
