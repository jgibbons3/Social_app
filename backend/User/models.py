from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from Post.models import Post


class User(AbstractUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    email = models.EmailField(unique=True)

    username = models.CharField(
        verbose_name='username',
        max_length=50,
        unique=True)

    city = models.CharField(
        verbose_name='city',
        max_length=50,
        blank=True)

    country = models.CharField(
        verbose_name='country',
        max_length=50,
        blank=True)

    about = models.CharField(
        verbose_name='about',
        max_length=300,
        blank=True)

    like_post = models.ManyToManyField(
         verbose_name='liked_posts',
         to=Post,
         related_name='like_by',
         blank=True)

    followees = models.ManyToManyField(
        verbose_name='followees',
        to=settings.AUTH_USER_MODEL,
        related_name='followers',
        blank=True)

    image = models.ImageField(
        verbose_name='user image',
        blank=True,
        null=True)


    def __str__(self):
        return f'{self.username}'


class Friendship(models.Model):
    friendship_choices = [
        ('accept', 'accept'),
        ('reject', 'reject'),
        ('pending', 'pending'),
    ]

    friendship_status = models.CharField(
        max_length=20,
        choices=friendship_choices,
        default='pending',
    )

    requester_user = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        verbose_name='requester',
        related_name='requested',
        blank=True,
    )

    receiver_user =models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        verbose_name='receiver',
        related_name='received',
        blank=True,
    )    

    def __str__(self):
        return f' Requester: {self.requester_user}/ Receiver: {self.receiver_user}/ Status:{self.friendship_status}/'