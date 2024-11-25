# Generated by Django 5.1.3 on 2024-11-22 12:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0002_teacherrequest'),
    ]

    operations = [
        migrations.CreateModel(
            name='Courses',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, unique=True)),
                ('teachers', models.JSONField(blank=True, default=list)),
            ],
        ),
        migrations.AddField(
            model_name='teacher',
            name='courses',
            field=models.JSONField(blank=True, default=list),
        ),
    ]
