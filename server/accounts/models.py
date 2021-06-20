from django.db import models
from django.db.models.deletion import CASCADE
from django.utils import timezone
# Create your models here.


class Accounts(models.Model):
    bank_name = models.CharField(max_length=50)
    account_number = models.CharField(
        primary_key=True, null=False, max_length=13)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return self.account_number


class Transactions(models.Model):
    account_number = models.ForeignKey(Accounts, on_delete=CASCADE)
    transaction_amount = models.DecimalField(max_digits=7, decimal_places=2)
    date = models.DateField(null=False)
    category = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return self.transaction_amount
