from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.contenttypes.admin import GenericTabularInline
from Post.models import Post
from .models import User, Friendship

# admin.site.register(User)
admin.site.register(Friendship)

class PostInline(admin.TabularInline):
    model = Post

@admin.register(User)
class UserAdmin(UserAdmin):
    readonly_fields = ('date_joined',)
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2')}
         ),
    )
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'city', 'country', 'about')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
        ('Groups', {'fields': ('groups',)}),
        ('Socials', {'fields': ('like_post', 'followees', 'image')}),
    )
    list_display = ('email', 'username', 'first_name', 'last_name', 'is_staff')
    ordering = ('email',)

    inlines = [
        PostInline,
    ]
    