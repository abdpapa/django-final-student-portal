from django.db import models

class Post(models.Model):
    postByUser = models.CharField(max_length=255, null=False)
    coursePageName = models.CharField(max_length=255, null=True)
    textData = models.TextField()
    dateCreated = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Post by {self.postByUser} in {self.coursePageName}"  # Display user and course name


class Comment(models.Model):
    postid = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    textData = models.TextField()
    dateCreated = models.DateTimeField(auto_now_add=True)  # Fix typo: auto_created -> auto_now_add

    def __str__(self):
        return f"Comment by {self.username} on Post ID {self.postid}"  # Display user and post ID
