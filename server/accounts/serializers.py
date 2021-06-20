from rest_framework import serializers, fields
from .models import *


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accounts
        fields = '__all__'


class TransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transactions
        fields = ['id', 'transaction_amount',
                  'date', 'account_number', 'category']
