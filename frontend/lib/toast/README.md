# Sistema de Toasts Centralizado

Este diretório contém todas as mensagens de toast do sistema, organizadas por categoria.

## Estrutura

```
lib/toast/
├── agendamento/
│   └── index.ts
├── paciente/
│   └── index.ts
├── procedimento/
│   └── index.ts
└── README.md
```

## Como Usar

### Agendamento

```typescript
import { 
  sucessoCriarAgendamento, 
  erroCriarAgendamento, 
  campoObrigatorio 
} from "@/lib/toast/agendamento";

// Sucesso
sucessoCriarAgendamento();

// Erro
erroCriarAgendamento("Mensagem opcional de erro");

// Campo obrigatório
campoObrigatorio("selecione um paciente");
```

### Paciente

```typescript
import { 
  sucessoCriarPaciente, 
  erroCriarPaciente 
} from "@/lib/toast/paciente";

// Sucesso
sucessoCriarPaciente();

// Erro
erroCriarPaciente("Mensagem opcional");
```

### Procedimento

```typescript
import { 
  sucessoCriarProcedimento, 
  erroCriarProcedimento 
} from "@/lib/toast/procedimento";

// Sucesso
sucessoCriarProcedimento();

// Erro
erroCriarProcedimento("Mensagem opcional");
```

## Padrão de Nomenclatura

- **Sucesso**: `sucesso{Ação}{Entidade}` (ex: `sucessoCriarPaciente`)
- **Erro**: `erro{Ação}{Entidade}` (ex: `erroCriarAgendamento`)
- **Validação**: `{tipoValidacao}` (ex: `campoObrigatorio`)

## Benefícios

1. **Consistência**: Todas as mensagens seguem o mesmo padrão
2. **Manutenibilidade**: Fácil atualizar mensagens em um só lugar
3. **Reutilização**: Funções podem ser usadas em qualquer componente
4. **Localização**: Facilita futuras traduções
5. **Performance**: Importações mais limpas e organizadas
