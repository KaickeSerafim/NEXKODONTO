from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from ..models import Procedimento
from ..serializer.procedimento_serializers import ProcedimentoSerializer
from ..filter.procedimento_filter import ProcedimentoFilter
from apps.utils.pagination import CustomLimitOffsetPagination
from apps.utils.response_builder import ResponseBuilder

class ProcedimentoListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProcedimentoSerializer
    pagination_class = CustomLimitOffsetPagination
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = ProcedimentoFilter
    ordering = ['-criado_em']

    def get_queryset(self):
        return Procedimento.objects.filter(dentista=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(dentista=request.user)
            return ResponseBuilder().created("Procedimento criado com sucesso").with_data(serializer.data).to_response()
        return ResponseBuilder().error("Erro ao criar procedimento").with_errors(serializer.errors).to_response()

class ProcedimentoDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProcedimentoSerializer

    def get_queryset(self):
        return Procedimento.objects.filter(dentista=self.request.user)
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            self.perform_update(serializer)
            return ResponseBuilder().success("Procedimento atualizado com sucesso").with_data(serializer.data).to_response()
        return ResponseBuilder().error("Erro ao atualizar procedimento").with_errors(serializer.errors).to_response()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return ResponseBuilder().success("Procedimento deletado com sucesso").with_status(204).to_response()
