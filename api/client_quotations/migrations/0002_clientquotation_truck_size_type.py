# Generated by Django 2.0.1 on 2018-04-25 04:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('truck_size_types', '0002_auto_20180419_0322'),
        ('client_quotations', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='clientquotation',
            name='truck_size_type',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='truck_size_types.TruckSizeType'),
        ),
    ]
