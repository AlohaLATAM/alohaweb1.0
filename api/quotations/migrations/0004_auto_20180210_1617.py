# Generated by Django 2.0.1 on 2018-02-10 16:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('trucks', '0001_initial'),
        ('quotations', '0003_quotation_driver_assigned'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='quotation',
            name='driver_assigned',
        ),
        migrations.AddField(
            model_name='quotation',
            name='assigned_truck',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='trucks.Truck'),
        ),
    ]
