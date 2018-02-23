# Generated by Django 2.0.1 on 2018-02-11 23:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trucks', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='truck',
            name='alto',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='truck',
            name='alto_total',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='truck',
            name='ancho',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='truck',
            name='carga_util',
            field=models.IntegerField(default=0, max_length=5, null=True),
        ),
        migrations.AddField(
            model_name='truck',
            name='largo',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='truck',
            name='mts_cubicos',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='truck',
            name='peso_bruto',
            field=models.IntegerField(default=0, max_length=5, null=True),
        ),
        migrations.AddField(
            model_name='truck',
            name='peso_neto',
            field=models.IntegerField(default=0, max_length=5, null=True),
        ),
    ]
