from django.http import HttpResponse
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import *
from .models import *
import datetime
# Create your views here.


def current_datetime(request):
    now = datetime.datetime.now()
    html = "<html><body>It is now %s.</body></html>" % now
    return HttpResponse(html)


class MultipleFieldLookupMixin:
    """
    Apply this mixin to any view or viewset to get multiple field filtering
    based on a `lookup_fields` attribute, instead of the default single field filtering.
    """

    def get_object(self):
        queryset = self.get_queryset()             # Get the base queryset
        queryset = self.filter_queryset(queryset)  # Apply any filter backends
        filter = {}
        for field in self.lookup_fields:
            if self.kwargs[field]:  # Ignore empty fields.
                filter[field] = self.kwargs[field]
        obj = get_object_or_404(queryset, **filter)  # Lookup the object
        self.check_object_permissions(self.request, obj)
        return obj


class AccountsList(generics.ListAPIView):

    queryset = Accounts.objects.all()
    serializer_class = AccountSerializer


class TransactionsList(generics.ListAPIView):

    queryset = Transactions.objects.all()
    serializer_class = TransactionSerializer


class MonthTransactions(generics.ListAPIView):

    queryset = Transactions.objects.all()
    serializer_class = TransactionSerializer

    def get(self, request, format=None):
        print(request.data)
        return Response(queryset, status=status.HTTP_200_OK)


class LatestTransactionsList(generics.ListAPIView):

    queryset = Transactions.objects.all()[:5]
    serializer_class = TransactionSerializer


class CreateAccount(generics.CreateAPIView):
    queryset = Accounts.objects.all()
    serializer_class = AccountSerializer


class CreateTransaction(generics.CreateAPIView):
    queryset = Transactions.objects.all()
    serializer_class = TransactionSerializer


class EditAccount(generics.UpdateAPIView):

    serializer_class = AccountSerializer
    queryset = Accounts.objects.all()


class EditTransactions(generics.UpdateAPIView):

    serializer_class = TransactionSerializer
    queryset = Transactions.objects.all()


class DeleteAccount(generics.RetrieveDestroyAPIView):
    serializer_class = AccountSerializer
    queryset = Accounts.objects.all()


class DeleteTransaction(generics.RetrieveDestroyAPIView):
    serializer_class = TransactionSerializer
    queryset = Transactions.objects.all()


class GetAccountTransactions(APIView):
    serializer_class = TransactionSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        query = Transactions.objects.filter(account_number=code)
        data = []
        for i in query:
            xyz = TransactionSerializer(i).data
            data.append(xyz)
        return Response(data, status=status.HTTP_200_OK)


class GetYearlyTransactions(MultipleFieldLookupMixin, generics.RetrieveAPIView):
    queryset = Transactions.objects.all()
    serializer_class = TransactionSerializer
    lookup_fields = ['account', 'date']
