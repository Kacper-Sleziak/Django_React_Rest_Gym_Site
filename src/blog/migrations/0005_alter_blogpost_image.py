# Generated by Django 3.2.7 on 2022-02-12 10:22

import blog.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0004_alter_blogpost_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogpost',
            name='image',
            field=models.ImageField(upload_to=blog.models.image_upload_location),
        ),
    ]
