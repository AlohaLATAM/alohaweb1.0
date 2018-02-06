# -*- coding: utf-8 -*-
from rest_framework import viewsets, status
from rest_framework.response import Response
from . models import InventoryStuff
from . serializer import InventoryStuffSerializer


class InventoryStuffViewSet(viewsets.ViewSet):
    def create(self, request):
        inventory = InventoryStuff()
        inventory_item_id, message = inventory.register(request.data)

        if inventory_item_id:
            try:
                inventory = InventoryStuff.objects.get(pk=inventory_item_id)
            except:
                return Response('No se pudo encontrar el item registrado.', status=status.HTTP_404_NOT_FOUND)

            result = InventoryStuffSerializer(inventory)

            return Response(result.data)

        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        quotation_id = request.query_params.get('quotation_id')

        if quotation_id:
            inventory = InventoryStuff.objects.filter(quotation=quotation_id)
            results = InventoryStuffSerializer(inventory, many=True)

            return Response(results.data)

        return Response('Cannot show all the inventory items.')

    def destroy(self, request, pk=None):
        quotation_id = request.query_params.get('quotation_id')

        if quotation_id:
            try:
                inventory_item = InventoryStuff.objects.get(pk=pk, quotation=quotation_id)
            except:
                return Response('Item no encontrado.', status=status.HTTP_404_NOT_FOUND)

            inventory_item.delete()

            return Response('Item eliminado.')
        
        return Response('Cotización no encontrada.', status=status.HTTP_404_NOT_FOUND)