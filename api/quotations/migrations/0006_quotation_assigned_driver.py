# Generated by Django 2.0.1 on 2018-02-11 00:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('drivers', '0001_initial'),
        ('quotations', '0005_quotation_driver_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='quotation',
            name='assigned_driver',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='drivers.Driver'),
        ),
    ]
