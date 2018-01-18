from django.db import models

class Preferences(models.Model):
    base_quotation_price = models.IntegerField()
    base_stevedor_price = models.IntegerField()