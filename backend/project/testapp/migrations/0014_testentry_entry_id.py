# Generated by Django 5.1.3 on 2024-11-23 22:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testapp', '0013_remove_testentry_subject_id_testentry_sub_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='testentry',
            name='entry_id',
            field=models.JSONField(blank=True, default=int),
        ),
    ]
