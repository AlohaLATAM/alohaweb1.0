# Generated by Django 2.0.1 on 2018-01-29 01:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='StuffSize',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('time_move', models.IntegerField(default=0)),
                ('time_instalation', models.IntegerField(default=0)),
                ('time_packaging', models.IntegerField(default=0)),
            ],
        ),
    ]