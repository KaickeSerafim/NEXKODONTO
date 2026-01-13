from .paciente_views import PacienteListCreateView, PacienteDetailView
from .agendamento_views import AgendamentoListCreateView, AgendamentoDetailView, DesmarcarAgendamentoView
from .ficha_paciente_views import (HistoricoMedicoDetailView, PlanoTratamentoListCreateView, 
                                 PlanoTratamentoDetailView, FichaPacienteView)
from .atendimento_views import AtendimentosListView
from .procedimento_views import ProcedimentoListCreateView, ProcedimentoDetailView
from .disponibilidade_views import DisponibilidadeView
