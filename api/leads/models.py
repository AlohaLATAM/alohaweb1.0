from django.db import models
from core.models import Person


class Lead(Person):
    email = models.EmailField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.first_name + ' ' + self.email

    def register(self, data):
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        dni = data.get('dni')
        email = data.get('email')

        if not first_name or not last_name or not dni:
            return None, 'Todos los campos son requeridos.'

        try:
            registeredLead = Lead.objects.get(dni=dni)

            return None, 'El DNI ya fue registrado anteriormente.'
        except:
            pass

        lead = Lead.objects.create(
            first_name=first_name,
            last_name=last_name,
            dni=dni,
            email=email
        )

        lead.save()

        return lead.id, 'ok'