# Generated by Django 2.0.1 on 2018-02-08 21:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quotations', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='quotation',
            name='datetime_of_service',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
