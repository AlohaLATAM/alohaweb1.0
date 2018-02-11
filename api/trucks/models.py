from django.db import models
from drivers.models import Driver
from truck_size_types.models import TruckSizeType
from hashids import Hashids


hashids = Hashids(salt='aloha-pe', min_length=4)


class Truck(models.Model):
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE)
    truck_type = models.ForeignKey(TruckSizeType, on_delete=models.CASCADE)
    registration_number = models.CharField(max_length=20, unique=True)
    its_furgon = models.BooleanField(default=False)
    peso_bruto = models.IntegerField(max_length=5, default=0, null=True)
    peso_neto = models.IntegerField(max_length=5, default=0, null=True)
    carga_util = models.IntegerField(max_length=5, default=0, null=True)
    alto_total = models.DecimalField(max_length=10, decimal_places=2, default=0, null=True)
    alto = models.DecimalField(max_length=10, decimal_places=2, default=0, null=True)
    ancho = models.DecimalField(max_length=10, decimal_places=2, default=0, null=True)
    largo = models.DecimalField(max_length=10, decimal_places=2, default=0, null=True)
    mts_cubicos = models.DecimalField(max_length=10, decimal_places=2, default=0, null=True)

    def __str__(self):
        return self.truck_type.name

    def register(self, data):
        driver_id = data.get('driver_id')
        truck_size_type_id = data.get('truck_size_type_id')
        registration_number = data.get('registration_number')
        its_furgon = data.get('its_furgon')
        peso_bruto = data.get('peso_bruto')
        peso_neto = data.get('peso_neto')
        carga_util = data.get('carga_util')
        alto_total = data.get('alto_total')
        alto = data.get('alto')
        ancho = data.get('ancho')
        largo = data.get('largo')

        if not driver_id:
            return None, 'No se encontró el conductor asociado.'
        
        if not truck_size_type_id:
            return None, 'No se encontró el tipo de camión.'

        if not registration_number:
            return None, 'El número de placa es requerido.'
        
        if not its_furgon:
            its_furgon = False

        if alto and ancho and largo:
            mts_cubicos = alto * ancho * largo
        else:
            mts_cubicos = None

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
            its_furgon=its_furgon,
            peso_bruto=peso_bruto,
            peso_neto=peso_neto,
            carga_util=carga_util,
            alto_total=alto_total,
            alto=alto,
            ancho=ancho,
            largo=largo,
            mts_cubicos=mts_cubicos
        )

        truck.save()

        return truck.id, 'ok'