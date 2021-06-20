from django.urls import path
from .views import *

app_name = "accounts"

urlpatterns = [
    path('', current_datetime),
    path('api/accounts/', AccountsList.as_view()),
    path('api/create_accounts/', CreateAccount.as_view()),
    path('api/edit_account/<str:pk>', EditAccount.as_view()),
    path('api/delete_account/<str:pk>', DeleteAccount.as_view()),
    path('api/transactions/', TransactionsList.as_view()),
    path('api/add_transactions/', CreateTransaction.as_view()),
    path('api/month_transactions/', MonthTransactions.as_view()),
    path('api/edit_transaction/<int:pk>', EditTransactions.as_view()),
    path('api/delete_transaction/<int:pk>', DeleteTransaction.as_view()),
    path('api/latest_transactions/', LatestTransactionsList.as_view()),
    path('api/get_transactions_account/', GetAccountTransactions.as_view()),
]
