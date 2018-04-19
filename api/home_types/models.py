from django.db import models


class HomeType(models.Model):
    HOME_ICONS = (
        ('fa-home', 'Casa'),
        ('fa-building', 'Departamento'),
    )
    HOME_VALUES = (
        ('home', 'Casa'),
        ('building', 'Departamento')
    )

    name = models.CharField(max_length=50)
    effort = models.IntegerField(default=0)
    value = models.CharField(max_length=50, default='', choices=HOME_VALUES)
    icon = models.CharField(max_length=50, default='', choices=HOME_ICONS)

    def __str__(self):
        return self.name
