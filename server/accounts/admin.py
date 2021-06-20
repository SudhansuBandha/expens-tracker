from django.contrib import admin
from . import models
# Register your models here.


@admin.register(models.Transactions)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'account_number', 'transaction_amount', 'date')


admin.site.register(models.Accounts)
