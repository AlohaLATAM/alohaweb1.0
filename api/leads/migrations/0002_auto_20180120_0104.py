# Generated by Django 2.0.1 on 2018-01-20 01:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leads', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lead',
            name='email',
            field=models.EmailField(max_length=100),
        ),
    ]
