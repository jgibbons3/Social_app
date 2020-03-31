from django.db import models
from django.conf import settings

class Post(models.Model):
    owner = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='posts',
        blank=True)

    title = models.TextField(
        verbose_name='title',
        blank=True)

    content = models.TextField(
        verbose_name='content',
        blank=True
    )

    date = models.DateField(
        auto_now_add=True)

    def __str__(self):
        return f' {self.owner} / {self.title} / {self.content}'



class Comment(models.Model):
    comment_owner = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='comments',
        blank=True)

    comment = models.TextField(
        verbose_name='comment',
        blank=True
    )

    comment_post = models.ForeignKey(
        to=Post,
        on_delete=models.CASCADE,
        related_name='commentedPost',
        blank=True)

    def __str__(self):
        return f' Comment Owner: {self.comment_owner} / Comment: {self.comment} / Post id commented: {self.comment_post}'


