# Generated by Django 5.1.3 on 2024-11-23 13:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testapp', '0007_delete_chapters_delete_subjects'),
    ]

    operations = [
        migrations.CreateModel(
            name='Chapters',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('chapter_id', models.JSONField(blank=True, default=int)),
                ('name', models.CharField(max_length=150, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Subjects',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject_id', models.JSONField(blank=True, default=int)),
                ('name', models.CharField(max_length=150, unique=True)),
                ('chapters', models.JSONField(blank=True, default=list)),
            ],
        ),
    ]
