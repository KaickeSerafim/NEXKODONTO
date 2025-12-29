# Rota de Desmarcação de Agendamentos

## Endpoint
**POST** `/api/clinic/agendamentos/desmarcar/`

## Descrição
Esta rota permite desmarcar um ou múltiplos agendamentos de uma vez. Ao desmarcar, o sistema:
1. Define `active = False` no agendamento
2. Atualiza o campo `motivo` com "Agendamento desmarcado por [Nome do Usuário]"
3. Altera o `status` para "cancelada"
4. Cria ou atualiza um registro em `Atendimentos` com status "cancelada"
5. Define o `diagnostico` como "Atendimento desmarcado por [Nome do Usuário]"
6. Define o `tratamento_realizado` como "Agendamento cancelado - Não houve atendimento"

## Autenticação
Requer autenticação via token JWT.

## Permissões
- O usuário autenticado deve ser o dentista responsável pelo(s) agendamento(s)
- Não é possível desmarcar um agendamento que já está cancelado
- Agendamentos que não pertencem ao dentista ou já estão cancelados serão reportados como erros

## Request Body

### Opção 1: Desmarcar um único agendamento
```json
{
  "agendamento_id": 123
}
```

### Opção 2: Desmarcar múltiplos agendamentos
```json
{
  "agendamento_ids": [123, 456, 789]
}
```

### Parâmetros
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| agendamento_id | integer | Condicional* | ID do agendamento a ser desmarcado |
| agendamento_ids | array[integer] | Condicional* | Lista de IDs de agendamentos a serem desmarcados |

**Nota:** Você deve fornecer **OU** `agendamento_id` **OU** `agendamento_ids`, mas não ambos.

## Responses

### Sucesso Total - Um Agendamento (200 OK)
```json
{
  "success": true,
  "message": "1 agendamento(s) desmarcado(s) com sucesso",
  "data": {
    "resultados": [
      {
        "agendamento_id": 123,
        "status": "cancelada",
        "active": false,
        "motivo": "Agendamento desmarcado por Dr. João Silva",
        "atendimento_id": 456,
        "atendimento_criado": true
      }
    ],
    "erros": [],
    "total_processados": 1,
    "total_erros": 0,
    "total_solicitados": 1
  }
}
```

### Sucesso Total - Múltiplos Agendamentos (200 OK)
```json
{
  "success": true,
  "message": "3 agendamento(s) desmarcado(s) com sucesso",
  "data": {
    "resultados": [
      {
        "agendamento_id": 123,
        "status": "cancelada",
        "active": false,
        "motivo": "Agendamento desmarcado por Dr. João Silva",
        "atendimento_id": 456,
        "atendimento_criado": true
      },
      {
        "agendamento_id": 124,
        "status": "cancelada",
        "active": false,
        "motivo": "Agendamento desmarcado por Dr. João Silva",
        "atendimento_id": 457,
        "atendimento_criado": false
      },
      {
        "agendamento_id": 125,
        "status": "cancelada",
        "active": false,
        "motivo": "Agendamento desmarcado por Dr. João Silva",
        "atendimento_id": 458,
        "atendimento_criado": true
      }
    ],
    "erros": [],
    "total_processados": 3,
    "total_erros": 0,
    "total_solicitados": 3
  }
}
```

### Sucesso Parcial (200 OK)
Quando alguns agendamentos são desmarcados com sucesso e outros falham:
```json
{
  "success": true,
  "message": "2 agendamento(s) desmarcado(s) com sucesso. 1 erro(s) encontrado(s).",
  "data": {
    "resultados": [
      {
        "agendamento_id": 123,
        "status": "cancelada",
        "active": false,
        "motivo": "Agendamento desmarcado por Dr. João Silva",
        "atendimento_id": 456,
        "atendimento_criado": true
      },
      {
        "agendamento_id": 125,
        "status": "cancelada",
        "active": false,
        "motivo": "Agendamento desmarcado por Dr. João Silva",
        "atendimento_id": 458,
        "atendimento_criado": true
      }
    ],
    "erros": [
      {
        "agendamento_id": 124,
        "erro": "Este agendamento já está cancelado"
      }
    ],
    "total_processados": 2,
    "total_erros": 1,
    "total_solicitados": 3
  }
}
```

### Erro - Dados Inválidos (400 Bad Request)
```json
{
  "success": false,
  "message": "Dados inválidos",
  "errors": {
    "non_field_errors": ["Você deve fornecer 'agendamento_id' ou 'agendamento_ids'."]
  }
}
```

### Erro - Agendamento(s) Não Encontrado(s) (400 Bad Request)
```json
{
  "success": false,
  "message": "Dados inválidos",
  "errors": {
    "non_field_errors": ["Agendamentos não encontrados: [999, 1000]"]
  }
}
```

### Erro - Nenhum Agendamento Desmarcado (400 Bad Request)
Quando todos os agendamentos falharam (ex: todos já cancelados ou sem permissão):
```json
{
  "success": false,
  "message": "Nenhum agendamento foi desmarcado",
  "data": {
    "resultados": [],
    "erros": [
      {
        "agendamento_id": 123,
        "erro": "Este agendamento já está cancelado"
      },
      {
        "agendamento_id": 124,
        "erro": "Você não tem permissão para desmarcar este agendamento"
      }
    ],
    "total_processados": 0,
    "total_erros": 2,
    "total_solicitados": 2
  }
}
```

### Erro - Erro Interno (500 Internal Server Error)
```json
{
  "success": false,
  "message": "Erro ao desmarcar agendamento(s): [detalhes do erro]"
}
```

## Exemplos de Uso

### cURL - Um Agendamento
```bash
curl -X POST http://localhost:8000/api/clinic/agendamentos/desmarcar/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -d '{"agendamento_id": 123}'
```

### cURL - Múltiplos Agendamentos
```bash
curl -X POST http://localhost:8000/api/clinic/agendamentos/desmarcar/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -d '{"agendamento_ids": [123, 456, 789]}'
```

### JavaScript (Fetch API) - Um Agendamento
```javascript
const desmarcarAgendamento = async (agendamentoId) => {
  try {
    const response = await fetch('http://localhost:8000/api/clinic/agendamentos/desmarcar/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        agendamento_id: agendamentoId
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('Agendamento(s) desmarcado(s):', data.data);
    } else {
      console.error('Erro:', data.message);
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
};
```

### JavaScript (Fetch API) - Múltiplos Agendamentos
```javascript
const desmarcarAgendamentos = async (agendamentoIds) => {
  try {
    const response = await fetch('http://localhost:8000/api/clinic/agendamentos/desmarcar/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        agendamento_ids: agendamentoIds
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log(`${data.data.total_processados} agendamento(s) desmarcado(s)`);
      
      if (data.data.total_erros > 0) {
        console.warn('Erros encontrados:', data.data.erros);
      }
      
      console.log('Resultados:', data.data.resultados);
    } else {
      console.error('Erro:', data.message);
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
};

// Exemplo de uso
desmarcarAgendamentos([123, 456, 789]);
```

### Python (requests) - Um Agendamento
```python
import requests

def desmarcar_agendamento(agendamento_id, token):
    url = 'http://localhost:8000/api/clinic/agendamentos/desmarcar/'
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {token}'
    }
    data = {
        'agendamento_id': agendamento_id
    }
    
    response = requests.post(url, json=data, headers=headers)
    return response.json()
```

### Python (requests) - Múltiplos Agendamentos
```python
import requests

def desmarcar_agendamentos(agendamento_ids, token):
    url = 'http://localhost:8000/api/clinic/agendamentos/desmarcar/'
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {token}'
    }
    data = {
        'agendamento_ids': agendamento_ids
    }
    
    response = requests.post(url, json=data, headers=headers)
    result = response.json()
    
    if result['success']:
        print(f"{result['data']['total_processados']} agendamento(s) desmarcado(s)")
        
        if result['data']['total_erros'] > 0:
            print(f"Erros: {result['data']['erros']}")
    
    return result

# Exemplo de uso
desmarcar_agendamentos([123, 456, 789], 'seu_token_jwt')
```

## Notas Importantes

1. **Flexibilidade**: A rota aceita tanto um único ID quanto múltiplos IDs, facilitando a integração.

2. **Processamento em Lote**: Ao desmarcar múltiplos agendamentos, o sistema processa cada um individualmente e retorna resultados detalhados.

3. **Resiliência**: Se alguns agendamentos falharem (ex: já cancelados), os demais ainda serão processados. A resposta incluirá tanto sucessos quanto erros.

4. **Validação Individual**: Cada agendamento é validado individualmente para:
   - Verificar se pertence ao dentista autenticado
   - Verificar se já está cancelado
   - Garantir que a operação seja bem-sucedida

5. **Atendimento**: O sistema cria automaticamente um registro de atendimento com status "cancelada" se não existir, ou atualiza o existente.

6. **Auditoria**: O campo `updated_by` do agendamento é atualizado com o usuário que realizou a desmarcação.

7. **Histórico**: O motivo da desmarcação fica registrado tanto no agendamento quanto no atendimento, incluindo o nome completo do usuário que realizou a ação.

8. **Resposta Detalhada**: A resposta sempre inclui:
   - Lista de agendamentos processados com sucesso
   - Lista de erros encontrados
   - Contadores de totais (processados, erros, solicitados)

