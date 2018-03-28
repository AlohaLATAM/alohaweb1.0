from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from accounts.models import Account
from accounts.serializer import AccountSerializer, AccountLoginSerializer


class TokenAuthenticationView(APIView):
    def post(self, request):
        a = Account()
        account, msg = a.authenticateUser(request.data)

        if account and account.token:
            result = AccountLoginSerializer(account)

            return Response(result.data)

        return Response({'error': msg}, status=status.HTTP_404_NOT_FOUND)


class AccountViewSet(viewsets.ViewSet):
    def create(self, request):
        a = Account()
        a_id, msg = a.register(request.data)

        if a_id:
            try:
                account = Account.objects.get(pk=a_id)
            except:
                return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

            result = AccountSerializer(account)

            return Response(result.data)

        return Response({'error': msg}, status=status.HTTP_400_BAD_REQUEST)
