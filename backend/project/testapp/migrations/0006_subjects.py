# Generated by Django 5.1.3 on 2024-11-23 13:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testapp', '0005_delete_subjects'),
    ]

    operations = [
        migrations.CreateModel(
            name='Subjects',
            fields=[
                ('subject_id', models.JSONField(default=int, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=150, unique=True)),
                ('chapters', models.JSONField(blank=True, default=list)),
            ],
        ),
    ]
