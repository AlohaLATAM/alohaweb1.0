from django.db import models
from drivers.models import Driver
from truck_size_types.models import TruckSizeType
from hashids import Hashids


hashids = Hashids(salt='aloha-pe', min_length=4)


class Truck(models.Model):
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE)
    truck_type = models.ForeignKey(TruckSizeType, on_delete=models.CASCADE)
    registration_number = models.CharField(max_length=20, unique=True)
    its_furgon = models.BooleanField(default=False, null=True)

    def __str__(self):
        return self.truck_type.name

    def register(self, data):
        driver_id = data.get('driver_id')
        truck_size_type_id = data.get('truck_size_type_id')
        registration_number = data.get('registration_number')
        its_furgon = data.get('its_furgon')

        if not driver_id:
            return None, 'No se encontró el conductor asociado.'
        
        if not truck_size_type_id:
            return None, 'No se encontró el tipo de camión.'

        if not registration_number:
            return None, 'El número de placa es requerido.'

        try:
            driver_id = hashids.decode(driver_id)
            driver = Driver.objects.get(pk=driver_id)
        except:
            return None, 'No se encontró el conductor asociado.'

        try:
            truck_type = TruckSizeType.objects.get(pk=truck_size_type_id)
        except:
            return None, 'No se encontró el tipo de camión.'

        truck = Truck.objects.create(
            driver=driver,
            truck_type=truck_type,
            registration_number=registration_number,
            its_furgon=its_furgon
        )

        truck.save()

        return truck.id, 'ok'