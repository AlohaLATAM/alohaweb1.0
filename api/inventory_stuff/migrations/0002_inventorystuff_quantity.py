from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory_stuff', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='inventorystuff',
            name='quantity',
            field=models.IntegerField(default=1),
        ),
    ]
