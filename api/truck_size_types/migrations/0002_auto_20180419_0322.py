# Generated by Django 2.0.1 on 2018-04-19 03:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('truck_size_types', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='trucksizetype',
            name='description',
            field=models.CharField(default='', max_length=250),
        ),
        migrations.AddField(
            model_name='trucksizetype',
            name='value',
            field=models.CharField(choices=[('xs', 'Pequeño'), ('md', 'Mediano'), ('lg', 'grande')], default='', max_length=5),
        ),
    ]
