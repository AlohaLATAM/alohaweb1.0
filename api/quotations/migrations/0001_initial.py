# Generated by Django 2.0.1 on 2018-02-06 02:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('truck_size_types', '0001_initial'),
        ('leads', '0001_initial'),
        ('home_types', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Quotation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address_from', models.CharField(max_length=200)),
                ('floor_from', models.IntegerField(default=1)),
                ('lat_from', models.CharField(max_length=20, null=True)),
                ('lng_from', models.CharField(max_length=20, null=True)),
                ('address_to', models.CharField(max_length=200)),
                ('floor_to', models.IntegerField(default=1)),
                ('lat_to', models.CharField(max_length=20, null=True)),
                ('lng_to', models.CharField(max_length=20, null=True)),
                ('travel_distance_aprox', models.IntegerField(default=0)),
                ('travel_distance_aprox_label', models.CharField(default='', max_length=20)),
                ('travel_time_aprox', models.IntegerField(default=0)),
                ('travel_time_aprox_label', models.CharField(default='', max_length=20)),
                ('packaging_time_aprox', models.IntegerField(default=0)),
                ('packaging_price', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('travel_price', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('total_price', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('final_price', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('profit', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('created', models.DateTimeField(auto_now_add=True, null=True)),
                ('state', models.BooleanField(default=False)),
                ('home_type_from', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='home_type_from', to='home_types.HomeType')),
                ('home_type_to', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='home_type_to', to='home_types.HomeType')),
                ('lead', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='leads.Lead')),
                ('truck_size_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='truck_size_types.TruckSizeType')),
            ],
        ),
    ]
