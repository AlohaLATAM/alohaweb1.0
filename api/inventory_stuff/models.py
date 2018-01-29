from django.db import models
from quotations.models import Quotation
from stuff.models import Stuff


class InventoryStuff(models.Model):
    quotation = models.ForeignKey(Quotation, on_delete=models.CASCADE)
    stuff = models.ForeignKey(Stuff, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)