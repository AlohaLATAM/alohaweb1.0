from django.db import models
from core.models import Person


class Lead(Person):
    email = models.EmailField(max_length=100, blank=True, null=True, default='')

    def __str__(self):
        return self.first_name + ' ' + self.email

    def register(self, data):
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        dni = data.get('dni')
        phone_number = data.get('phone_number')
        email = data.get('email')

        if not first_name or not last_name or not phone_number:
            return None, 'Todos los campos son requeridos.'

        if dni:
            try:
                registeredLead = Lead.objects.get(dni=dni)

                return None, 'El DNI ya fue registrado anteriormente.'
            except:
                pass

        lead = Lead.objects.create(
            first_name=first_name,
            last_name=last_name,
            dni=dni,
            phone_number=phone_number,
            email=email
        )

        lead.save()

        return lead.id, 'ok'