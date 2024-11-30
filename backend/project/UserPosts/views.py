from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from .models import Post
from .models import Comment

@api_view(['GET'])
def getPostsByCourse(request, courseName):
    """
    Fetch all posts related to a specific course name.
    """
    try:
        # Filter posts by course name
        posts = Post.objects.filter(coursePageName=courseName).order_by('-dateCreated')  # Sorted by latest
        if not posts.exists():
            return JsonResponse({'status': 'error', 'message': 'No posts found for this course'}, status=404)

        # Serialize posts data
        posts_list = [
            {
                'id': post.id,
                'postByUser': post.postByUser,
                'coursePageName': post.coursePageName,
                'textData': post.textData,
                'dateCreated': post.dateCreated
            } for post in posts
        ]

        # Return as JSON response
        return JsonResponse({'status': 'success', 'data': posts_list}, status=200)

    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    
@api_view(['GET'])
def getCommentsByPost(request, postID):
    try:
        comments = Comment.objects.filter(postid=postID).order_by('-dateCreated')
        if not comments.exists():
            return JsonResponse({'status': 'error', 'message': 'No comments found for this post'}, status=404)

        comments_list = [
            {
                'id': comment.id,
                'postid': comment.postid,
                'username': comment.username,
                'textData': comment.textData,
                'dateCreated': comment.dateCreated
            } for comment in comments
        ]

        return JsonResponse({'status': 'success', 'data': comments_list}, status=200)

    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    

@api_view(['POST'])
def addPost(request):
    """
    Add a new post to the posts table.
    """
    try:
        # Extract the data from the request body
        username = request.data.get('username')  # User who is posting
        course_name = request.data.get('courseName')  # Course related to the post
        text_data = request.data.get('textData')  # The content of the post
        
        # Validate that all necessary data is provided
        if not username or not course_name or not text_data:
            return JsonResponse({'status': 'error', 'message': 'All fields are required: username, courseName, textData'}, status=400)
        
        # Create a new Post object
        new_post = Post.objects.create(
            postByUser=username,
            coursePageName=course_name,
            textData=text_data
        )

        # Return a success response with the new post data
        return JsonResponse({
            'status': 'success',
            'message': 'Post created successfully!',
            'data': {
                'id': new_post.id,
                'postByUser': new_post.postByUser,
                'coursePageName': new_post.coursePageName,
                'textData': new_post.textData,
                'dateCreated': new_post.dateCreated
            }
        }, status=201)

    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

@api_view(['POST'])
def addComment(request):
    try:
        postID = request.data.get('postid')
        userName = request.data.get('username')
        textData = request.data.get('textData')

        if not userName or not textData or not postID:
            return JsonResponse({'status': 'error', 'message': 'All fields are required: username, textData'}, status=400)
        
        new_comment = Comment.objects.create(
            postid=postID,
            username=userName,
            textData=textData
        )

        return JsonResponse({
            'status': 'success',
            'message': 'Comment created successfully!',
            'data': {
                'id': new_comment.id,
                'postid': new_comment.postid,
                'username': new_comment.username,
                'textData': new_comment.textData,
                'dateCreated': new_comment.dateCreated
            }
        }, status=201)

    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
