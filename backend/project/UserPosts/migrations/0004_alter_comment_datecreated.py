# Generated by Django 5.1.3 on 2024-11-29 16:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UserPosts', '0003_remove_post_postid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='dateCreated',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
