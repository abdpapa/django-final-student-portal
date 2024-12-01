# Generated by Django 5.1.3 on 2024-11-26 17:14

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dateCreated', models.DateTimeField(auto_created=True)),
                ('postid', models.CharField(max_length=255)),
                ('username', models.CharField(max_length=255)),
                ('textData', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('postid', models.IntegerField(unique=True)),
                ('textData', models.TextField()),
                ('postByUser', models.CharField(max_length=255)),
                ('dateCreated', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]