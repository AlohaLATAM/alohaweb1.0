# Generated by Django 2.0.1 on 2018-04-19 03:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home_types', '0002_auto_20180419_0316'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hometype',
            name='value',
            field=models.CharField(choices=[('home', 'Casa'), ('building', 'Departamento')], default='', max_length=50),
        ),
    ]
