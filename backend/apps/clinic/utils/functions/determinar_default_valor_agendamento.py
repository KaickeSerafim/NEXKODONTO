def determinar_default_valor_agendamento(agendamento):
    """
    Determina o valor padrão para um agendamento baseado no procedimento selecionado,
    caso o valor ainda não tenha sido definido.
    """
    if agendamento.valor is None:
        if agendamento.procedimento:
            agendamento.valor = agendamento.procedimento.preco_base
        else:
            agendamento.valor = 0
    return agendamento.valor