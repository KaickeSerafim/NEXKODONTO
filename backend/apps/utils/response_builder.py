from rest_framework.response import Response
from rest_framework import status


class ResponseBuilder:
    def __init__(self):
        self._status = "success"
        self._message = None
        self._data = None
        self._errors = None
        self._http_status = status.HTTP_200_OK

    def success(self, message: str = "Operação realizada com sucesso."):
        self._status = "success"
        self._message = message
        self._http_status = status.HTTP_200_OK
        return self

    def created(self, message: str = "Recurso criado com sucesso."):
        self._status = "success"
        self._message = message
        self._http_status = status.HTTP_201_CREATED
        return self

    def error(self, message: str = "Ocorreu um erro ao processar a solicitação."):
        self._status = "error"
        self._message = message
        self._http_status = status.HTTP_400_BAD_REQUEST
        return self

    def with_data(self, data):
        self._data = data
        return self

    def with_errors(self, errors):
        self._errors = errors
        return self

    def with_status(self, http_status):
        """Permite definir manualmente o status HTTP (ex: 404, 500, etc.)"""
        self._http_status = http_status
        return self

    def to_response(self):
        """Retorna a resposta formatada para o DRF"""
        payload = {
            "status": self._status,
            "message": self._message,
            "data": self._data,
            "errors": self._errors,
        }
        return Response(payload, status=self._http_status)
