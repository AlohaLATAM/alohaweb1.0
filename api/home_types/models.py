from django.db import models


class HomeType(models.Model):
    name = models.CharField(max_length=50)
    effort = models.IntegerField(default=0)

    def __str__(self):
        return self.name