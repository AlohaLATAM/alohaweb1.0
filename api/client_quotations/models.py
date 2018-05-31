import culqipy
from django.db import models

from home_types.models import HomeType
from leads.models import Lead
from truck_size_types.models import TruckSizeType


culqipy.public_key = 'pk_test_U7HFCSBwpSTysW9m'
culqipy.secret_key = 'sk_test_nEXUMcxY0nC9fqDR'


class ClientQuotation(models.Model):
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE)
    address_from = models.CharField(max_length=120)
    address_to = models.CharField(max_length=120)
    final_price = models.IntegerField()
    floor_from = models.IntegerField(default=1)
    floor_to = models.IntegerField(default=1)
    observations = models.CharField(max_length=250)
    packaging_price = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    packaging_time_aprox = models.IntegerField(default=0)
    payment_method = models.CharField(max_length=20)
    service_date = models.DateTimeField(null=True, blank=True)
    total_price = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    travel_distance_aprox = models.IntegerField(default=0)
    travel_distance_aprox_label = models.CharField(max_length=20, default='')
    travel_price = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    travel_time_aprox = models.IntegerField(default=0)
    travel_time_aprox_label = models.CharField(max_length=20, default='')
    home_type_from = models.ForeignKey(HomeType, on_delete=models.CASCADE, related_name='client_home_type_from', null=True)
    home_type_to = models.ForeignKey(HomeType, on_delete=models.CASCADE, related_name='client_home_type_to', null=True)
    truck_size_type = models.ForeignKey(TruckSizeType, on_delete=models.CASCADE, default=None)
    culqui_token = models.CharField(max_length=200, null=True)
    culqui_charge = models.CharField(max_length=200, null=True)

    def register(self, data):
        customer = data.get('customer')

        try:
            l = Lead()

            l_id, msg = l.register(customer)

            if l_id:
                lead = Lead.objects.get(pk=l_id)
            else:
                return None, 'Lead not found'
        except:
            return None, 'Error registering the new lead'

        address_from = data.get('address_from')
        address_to = data.get('address_to')
        final_price = data.get('final_price')
        floor_from = data.get('floor_from')
        floor_to = data.get('floor_to')
        observations = data.get('observations')
        packaging_price = data.get('packaging_price')
        packaging_time_aprox = data.get('packaging_time_aprox')
        payment_method = data.get('payment_method')
        service_date = data.get('datetime_of_service')
        total_price = data.get('total_price')
        travel_distance_aprox = data.get('travel_distance_aprox')
        travel_distance_aprox_label = data.get('travel_distance_aprox_label')
        travel_price = data.get('travel_price')
        travel_time_aprox = data.get('travel_time_aprox')
        travel_time_aprox_label = data.get('travel_time_aprox_label')
        home_type_from_id = data.get('home_type_from_id')
        home_type_to_id = data.get('home_type_to_id')
        truck_size_type_id = data.get('truck_size_type_id')

        if not address_from or not home_type_from_id or not floor_from or not address_to or not home_type_to_id or not floor_to or not travel_distance_aprox or not travel_time_aprox or not truck_size_type_id or not packaging_time_aprox or not packaging_price or not travel_price or not total_price or not final_price or not payment_method:
            return None, 'Revise que todos los campos estén completos.'

        try:
            home_type_from = HomeType.objects.get(pk=home_type_from_id)
            home_type_to = HomeType.objects.get(pk=home_type_to_id)
        except:
            return None, 'El tipo de casa no es válido.'

        try:
            truck_size_type = TruckSizeType.objects.get(pk=truck_size_type_id)
        except:
            return None, 'El tipo de camión no es válido.'

        quotation = ClientQuotation.objects.create(
            lead=lead,
            address_from=address_from,
            address_to=address_to,
            final_price=final_price,
            floor_from=floor_from,
            floor_to=floor_to,
            observations=observations,
            packaging_price=packaging_price,
            packaging_time_aprox=packaging_time_aprox,
            payment_method=payment_method,
            service_date=service_date,
            total_price=total_price,
            travel_distance_aprox=travel_distance_aprox,
            travel_distance_aprox_label=travel_distance_aprox_label,
            travel_price=travel_price,
            travel_time_aprox=travel_time_aprox,
            travel_time_aprox_label=travel_time_aprox_label,
            home_type_from=home_type_from,
            home_type_to=home_type_to,
            truck_size_type=truck_size_type
        )

        quotation.save()

        if payment_method == 'card':
            try:
                card = data.get('card')

                card_info = {
                    'card_number': card.get('card_number'),
                    'currency_code': 'PEN',
                    'cvv': card.get('card_cvv'),
                    'exp_month': card.get('exp_month'),
                    'exp_year': card.get('card_year'),
                    'last_name': 'Muro',
                    'email': lead.email,
                    'first_name': 'William'
                }

                token = culqipy.Token.create(card_info)
                culqui_token = token["id"]

                charge_info = {
                    'address': 'Avenida Lima 1232',
                    'address_city': 'LIMA',
                    'amount': card.get('card_amount'),
                    'country_code': 'PE',
                    'currency_code': 'PEN',
                    'email': lead.email,
                    'first_name': 'William',
                    'last_name': 'Muro',
                    'phone_number': lead.phone_number,
                    'product_description': 'Servicio de Mudanza',
                    'token_id': culqui_token
                }

                culqui_charge = culqipy.Charge.create(charge_info)

                quotation.culqui_token = culqui_token
                quotation.culqui_charge = culqui_charge

                quotation.save()

                return quotation.id, 'ok'
            except Exception as e:
                lead.delete()
                quotation.delete()

                return None, str(e)

        return quotation.id, 'ok'

    def update(self, data, pk=None):
        observations = data.get('observations')
        service_date = data.get('datetime_of_service')

        if not observations or not service_date:
            return None, 'Revise que todos los campos estén completos.'

        try:
            quotation = ClientQuotation.objects.get(pk=pk)
        except:
            return None, 'Cotización no encontrada.'

        quotation.observations = observations
        quotation.service_date = service_date

        quotation.save()

        return quotation.id, 'ok'
