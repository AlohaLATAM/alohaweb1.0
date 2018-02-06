from django.db import models
from core.models import Person
from districts.models import District

class Driver(Person):
    license_number = models.CharField(unique=True, max_length=20, null=True)
    work_district = models.ForeignKey(District, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    verified = models.BooleanField(default=False)

    def __str__(self):
        return self.first_name

    def register(self, data):
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        phone_number = data.get('phone_number')
        dni = data.get('dni')
        license_number = data.get('license_number')
        district_id = data.get('district_id')

        if not first_name or not last_name or not phone_number or not dni or not license_number or not district_id:
            return None, 'Todos los campos son requeridos.'

        district = District.objects.get(pk=district_id)

        if not district:
            return None, 'El distrito ingresado no es válido.'

        try:
            registeredDni = Driver.objects.get(dni=dni)
            
            return None, 'El DNI ya está siendo usado por otro chofer.'
        except:
            pass

        try:
            registeredLicense = Driver.objects.get(license_number=license_number)
            
            return None, 'El número de licencia ya está siendo usado por otro chofer.'
        except:
            pass

        driver = Driver.objects.create(
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number,
            dni=dni,
            license_number=license_number,
            work_district=district
        )

        driver.save()
        
        return driver.id, 'ok'