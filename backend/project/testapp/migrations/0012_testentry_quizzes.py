# Generated by Django 5.1.3 on 2024-11-23 21:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testapp', '0011_testentry_courses_subjects_subjects_chapters'),
    ]

    operations = [
        migrations.AddField(
            model_name='testentry',
            name='quizzes',
            field=models.JSONField(blank=True, default=list),
        ),
    ]
