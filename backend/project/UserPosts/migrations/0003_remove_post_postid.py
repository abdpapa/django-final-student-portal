# Generated by Django 5.1.3 on 2024-11-26 17:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('UserPosts', '0002_post_coursepagename'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='postid',
        ),
    ]
