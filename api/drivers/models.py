from django.db import models
from core.models import Person
from districts.models import District
from django.contrib.auth.hashers import make_password, check_password
from hashids import Hashids


hashids = Hashids(salt='aloha-pe', min_length=4)


class Driver(Person):
    license_number = models.CharField(unique=True, max_length=20, null=True)
    work_district = models.ForeignKey(District, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    verified = models.BooleanField(default=False)
    username = models.CharField(unique=True, max_length=50, default='')
    password = models.CharField(max_length=250, default='')

    def __str__(self):
        return self.first_name

    def authenticate(self, data):
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return None, 'Todos los campos son requeridos.'

        try:
            driver = Driver.objects.get(username=username)
        except:
            return None, 'El usuario o la contraseña son incorrectos.'

        if not check_password(password, driver.password):
            return None, 'El usuario o la contraseña son incorrectos.'
        
        return hashids.encode(driver.id), 'ok'

    def register(self, data):
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        phone_number = data.get('phone_number')
        dni = data.get('dni')
        license_number = data.get('license_number')
        district_id = data.get('district_id')
        username = data.get('username')
        password = data.get('password')

        if not first_name or not last_name or not phone_number or not dni or not license_number or not district_id:
            return None, 'Todos los campos son requeridos.'

        try:
            district = District.objects.get(pk=district_id)
        except:
            return None, 'El distrito ingresado no es válido.'

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

        if username and password:
            driver.username = username
            driver.password = make_password(password)

        driver.save()
        
        return driver.id, 'ok'