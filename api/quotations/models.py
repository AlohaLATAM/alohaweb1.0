from django.db import models
from leads.models import Lead
from home_types.models import HomeType
from truck_size_types.models import TruckSizeType
from trucks.models import Truck


class Quotation(models.Model):
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE)
    address_from = models.CharField(max_length=200)
    home_type_from = models.ForeignKey(HomeType, on_delete=models.CASCADE, related_name='home_type_from', null=True)
    floor_from = models.IntegerField(default=1)
    lat_from = models.CharField(max_length=20, null=True)
    lng_from = models.CharField(max_length=20, null=True)
    address_to = models.CharField(max_length=200)
    home_type_to = models.ForeignKey(HomeType, on_delete=models.CASCADE, related_name='home_type_to', null=True)
    floor_to = models.IntegerField(default=1)
    lat_to = models.CharField(max_length=20, null=True)
    lng_to = models.CharField(max_length=20, null=True)
    travel_distance_aprox = models.IntegerField(default=0)
    travel_distance_aprox_label = models.CharField(max_length=20, default='')
    travel_time_aprox = models.IntegerField(default=0)
    travel_time_aprox_label = models.CharField(max_length=20, default='')
    truck_size_type = models.ForeignKey(TruckSizeType, on_delete=models.CASCADE)
    packaging_time_aprox = models.IntegerField(default=0)
    packaging_price = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    travel_price = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    total_price = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    final_price = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    profit = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    created = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    state = models.BooleanField(default=False)
    datetime_of_service = models.DateTimeField(null=True, blank=True)
    assigned_truck = models.ForeignKey(Truck, on_delete=models.CASCADE, null=True, blank=True)
    driver_price = models.IntegerField(default=0, null=True)

    def __str__(self):
        return self.lead.first_name

    def register(self, data):
        lead_id = data.get('lead_id')
        address_from = data.get('address_from')
        home_type_from_id = data.get('home_type_from_id')
        floor_from = data.get('floor_from')
        address_to = data.get('address_to')
        home_type_to_id = data.get('home_type_to_id')
        floor_to = data.get('floor_to')
        travel_distance_aprox = data.get('travel_distance_aprox')
        travel_time_aprox = data.get('travel_time_aprox')
        truck_size_type_id = data.get('truck_size_type_id')
        packaging_time_aprox = data.get('packaging_time_aprox')
        packaging_price = data.get('packaging_price')
        travel_price = data.get('travel_price')
        total_price = data.get('total_price')
        final_price = data.get('final_price')
        profit = data.get('profit')
        travel_distance_aprox_label = data.get('travel_distance_aprox_label')
        travel_time_aprox_label = data.get('travel_time_aprox_label')
        datetime_of_service = data.get('datetime_of_service')

        if not lead_id or not address_from or not home_type_from_id or not floor_from or not address_to or not home_type_to_id or not floor_to or not travel_distance_aprox or not travel_time_aprox or not truck_size_type_id or not packaging_time_aprox or not packaging_price or not travel_price or not total_price or not final_price or not profit:
            return None, 'Revise que todos los campos estén completos.'

        try:
            lead = Lead.objects.get(id=lead_id)
        except:
            return None, 'El lead no es válido.'

        try:
            home_type_from = HomeType.objects.get(id=home_type_from_id)
            home_type_to = HomeType.objects.get(id=home_type_to_id)
        except:
            return None, 'El tipo de casa no es válido.'

        try:
            truck_size_type = TruckSizeType.objects.get(id=truck_size_type_id)
        except:
            return None, 'El tipo de camión no es válido.'

        quotation = Quotation.objects.create(
            lead=lead,
            address_from=address_from,
            home_type_from=home_type_from,
            floor_from=floor_from,
            address_to=address_to,
            home_type_to=home_type_to,
            floor_to=floor_to,
            travel_distance_aprox=travel_distance_aprox,
            travel_time_aprox=travel_time_aprox,
            truck_size_type=truck_size_type,
            packaging_time_aprox=packaging_time_aprox,
            packaging_price=packaging_price,
            travel_price=travel_price,
            total_price=total_price,
            final_price=final_price,
            profit=profit,
            travel_distance_aprox_label=travel_distance_aprox_label,
            travel_time_aprox_label=travel_time_aprox_label,
            datetime_of_service=datetime_of_service
        )

        quotation.save()

        return quotation.id, 'ok'

    def assign_driver(self, pk, data):
        try:
            quotation = Quotation.objects.get(pk=pk)
        except:
            return None, 'No pudimos encontrar la cotización.'

        truck_id = data.get('truck_id')
        driver_price = data.get('driver_price')

        try:
            assigned_truck = Truck.objects.get(pk=truck_id)
        except:
            return None, 'No se encontró el camión.'
        
        quotation.assigned_truck = assigned_truck
        quotation.driver_price = driver_price

        quotation.save()

        return quotation.id, 'ok'