# Generated by Django 5.1.3 on 2024-11-26 21:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('testapp', '0017_quiz'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='subjects',
            name='subject_id',
        ),
    ]
