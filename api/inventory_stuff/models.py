from django.db import models
from quotations.models import Quotation


class InventoryStuff(models.Model):
    quotation = models.ForeignKey(Quotation, on_delete=models.CASCADE)
    item_name = models.CharField(max_length=100)
    quantity = models.IntegerField(default=1)

    def register(self, data):
        quotation_id = data.get('quotation_id')
        quantity = data.get('quantity')
        item_name = data.get('item_name')

        if not quotation_id:
            return None, 'No se encontró la cotización.'
        
        if not item_name or not quantity:
            return None, 'Todos los campos son obligatorios.'

        try:
            quotation = Quotation.objects.get(pk=quotation_id)
        except:
            return None, 'No se encontró la cotización.'
        
        inventory_stuff = InventoryStuff.objects.create(
            quotation=quotation,
            item_name=item_name,
            quantity=quantity
        )

        inventory_stuff.save()

        return inventory_stuff.id, 'ok'