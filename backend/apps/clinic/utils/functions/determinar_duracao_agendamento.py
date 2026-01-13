def determinar_duracao_agendamento(agendamento):
    """
    Determina a duração estimada para um agendamento baseado no procedimento selecionado,
    caso a duração ainda não tenha sido definida.
    """
    if agendamento.duracao_estimada is None:
        if agendamento.procedimento:
            agendamento.duracao_estimada = agendamento.procedimento.duracao_minutos
        else:
            agendamento.duracao_estimada = 30 # Valor padrão caso não tenha procedimento
    return agendamento.duracao_estimada
