from rest_framework.pagination import LimitOffsetPagination
from .response_builder import ResponseBuilder

class CustomLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10
    limit_query_param = 'limit'
    offset_query_param = 'offset'
    max_limit = 100

    def get_paginated_response(self, data):
        pagination_data = {
            'count': self.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data
        }
        return ResponseBuilder().success("Dados listados com sucesso").with_data(pagination_data).to_response()
