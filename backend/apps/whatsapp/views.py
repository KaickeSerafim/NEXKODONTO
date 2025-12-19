from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import logging

logger = logging.getLogger(__name__)

class WhatsAppWebhookView(APIView):
    authentication_classes = [] # Webhooks generally don't use standard auth unless signed
    permission_classes = []

    def post(self, request):
        data = request.data
        logger.info(f"WhatsApp Webhook received: {data}")
        # Here we will process the message later
        return Response({"status": "received"}, status=status.HTTP_200_OK)
