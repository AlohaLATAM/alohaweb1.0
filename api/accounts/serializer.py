from rest_framework import serializers
from accounts.models import Account


class AccountLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('token', )


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'
