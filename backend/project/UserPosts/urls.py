from django.urls import path
from .views import getPostsByCourse
from .views import addPost, addComment, getCommentsByPost

urlpatterns = [
    path('posts/<str:courseName>/', getPostsByCourse, name='get_posts_by_course'),
    path('add/', addPost, name='add_post'),
    path('addComment/', addComment, name='add_comment'),
    path('comments/<str:postID>/', getCommentsByPost, name='get_comments_by_post'),
]
