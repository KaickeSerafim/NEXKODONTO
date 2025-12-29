# Módulo: Opções do Dia do Calendário

Este módulo contém todos os componentes e funções relacionadas às opções disponíveis para cada dia do calendário de agendamentos.

## Estrutura de Arquivos

```
_opcoes-dia/
├── _desmarcar/                         # Módulo de desmarcação
│   ├── dialog-desmarcar-agendamentos.tsx
│   ├── menu-items.tsx
│   └── index.ts
└── _travar-dia/                        # Módulo de bloqueio de agenda
    ├── dialog-travar-dia.tsx
    ├── menu-item-travar-dia.tsx
    └── index.ts

app/functions/                          # Lógica global
├── desmarcar/
│   ├── status-acoes/
│   │   └── status-acoes.ts             # Handlers visuais
│   └── desmarcar-utils.ts              # Utilitários de payload
└── travar-dia/
    └── status-acoes/
        └── status-acoes.ts             # Handlers de bloqueio
```

## Componentes

### DialogDesmarcarAgendamentos
Dialog de confirmação para desmarcação de agendamentos.

**Props:**
- `open: boolean` - Estado de abertura do dialog
- `onOpenChange: (open: boolean) => void` - Callback para mudança de estado
- `onConfirm: () => void` - Callback ao confirmar
- `isPending: boolean` - Estado de loading
- `quantidadeAgendamentos: number` - Quantidade de agendamentos a desmarcar

**Funcionalidades:**
- Título dinâmico baseado na quantidade
- Descrição contextual
- Botões de ação com estados de loading

### MenuItemDesmarcar
Item do menu para desmarcar agendamentos.

**Props:**
- `onSelect: () => void` - Callback ao selecionar
- `quantidadeAgendamentos: number` - Quantidade de agendamentos

**Funcionalidades:**
- Ícone XCircle vermelho
- Mostra quantidade de agendamentos
- Estilo visual vermelho (danger)

### MenuItemVerCancelados
Item do menu para visualizar agendamentos cancelados.

**Props:**
- `onSelect: () => void` - Callback ao selecionar

**Funcionalidades:**
- Ícone Eye azul
- Estilo visual azul (info)

## Funções Utilitárias

### buildDesmarcarPayload
Constrói o payload correto para a API baseado na quantidade de agendamentos.

```typescript
buildDesmarcarPayload(agendamentoIds: number[]): DesmarcarPayload
```

**Lógica:**
- 1 agendamento → `{ agendamento_id: number }`
- Múltiplos → `{ agendamento_ids: number[] }`

### handleDesmarcarSuccess
Trata o sucesso da desmarcação com feedback apropriado.

```typescript
handleDesmarcarSuccess(data: DesmarcarAgendamentosResponse): void
```

**Feedback:**
- Sucesso total → Toast verde
- Sucesso parcial → Toast amarelo com detalhes
- Falha total → Toast vermelho com detalhes

### handleDesmarcarError
Trata erros na desmarcação.

```typescript
handleDesmarcarError(error: Error): void
```

**Feedback:**
- Toast vermelho com mensagem de erro
- Log no console para debug

## Uso

### Importação Simplificada

```typescript
import {
  DialogDesmarcarAgendamentos,
  MenuItemDesmarcar,
  MenuItemVerCancelados,
  buildDesmarcarPayload,
  handleDesmarcarSuccess,
  handleDesmarcarError,
} from "./_opcoes-dia";
```

### Exemplo de Uso

```typescript
const handleDesmarcar = () => {
  const payload = buildDesmarcarPayload(agendamentoIds);

  desmarcarAgendamentos(payload, {
    onSuccess: (data) => {
      handleDesmarcarSuccess(data);
      setOpenDesmarcar(false);
    },
    onError: (error) => {
      handleDesmarcarError(error);
    },
  });
};
```

## Benefícios da Componentização

1. **Separação de Responsabilidades**: Cada arquivo tem uma responsabilidade clara
2. **Reutilização**: Componentes podem ser reutilizados em outros contextos
3. **Testabilidade**: Funções isoladas são mais fáceis de testar
4. **Manutenibilidade**: Mudanças em uma funcionalidade não afetam outras
5. **Legibilidade**: Código mais limpo e organizado
6. **Escalabilidade**: Fácil adicionar novas opções ao menu

## Adicionando Novas Opções

Para adicionar uma nova opção ao menu:

1. Crie um novo componente em `menu-items.tsx`:
```typescript
export function MenuItemNovaOpcao({ onSelect }: MenuItemNovaOpcaoProps) {
  return (
    <DropdownMenuItem onSelect={onSelect}>
      {/* Conteúdo do item */}
    </DropdownMenuItem>
  );
}
```

2. Se necessário, crie handlers específicos em um novo arquivo
3. Adicione ao componente principal `button-opcoes-dia-calendario.tsx`
4. Exporte no `index.ts`
