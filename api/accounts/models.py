from django.contrib.auth.hashers import make_password, check_password
from django.db import models
from hashids import Hashids


hashids = Hashids(salt='aloha-pe', min_length=4)


class Account(models.Model):
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=250)
    token = models.CharField(max_length=250)

    def __str__(self):
        return self.username

    def register(self, data):
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return None, 'Todos los campos son requeridos.'

        account = Account.objects.create(
            username=username,
            password=make_password(password)
        )

        account.save()
        account.token = hashids.encode(account.id)
        account.save()

        return account.id, 'ok'

    def authenticateUser(self, data):
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return None, 'Todos los campos son requeridos.'

        try:
            account = Account.objects.get(username=username)
        except:
            return None, 'Not found'

        if not check_password(password, account.password):
            return None, 'Not found'

        return account, 'ok'
