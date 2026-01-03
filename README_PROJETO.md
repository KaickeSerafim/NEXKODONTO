# NEXKODONTO - Sistema de Gestão Odontológica Inteligente

## 🚀 Sobre o Projeto

O **NEXKODONTO** nasceu como um projeto de aprendizado prático e uma solução real para os desafios enfrentados por profissionais de odontologia, inspirado pela rotina da minha tia, que é dentista. 

Ao observar o mercado, percebi uma lacuna: softwares robustos e complexos demais, que muitas vezes exigem uma secretária ou muito tempo de gestão manual. O NEXKODONTO vem para transformar esse cenário, evoluindo de uma ferramenta familiar para um **SaaS (Software as a Service) escalável**, focado em simplicidade, eficiência e automação máxima.

### 💡 Visão Geral (Resumo)

O objetivo central é permitir que o odontólogo recupere seu tempo. O sistema é uma alternativa leve às plataformas pesadas do mercado, atendendo às mesmas demandas essenciais (agenda, prontuário, financeiro) com um diferencial crucial: **a automação do fluxo de agendamento**. O princípio é que o dentista **não precise de uma secretária** para gerenciar horários; grande parte dessa interação é feita de forma autônoma via bots inteligentes que conversam diretamente com o paciente.

---

## 🛠️ Tecnologias e Arquitetura

O projeto é dividido em uma arquitetura moderna de microserviços/apps, separando claramente as responsabilidades entre Backend e Frontend.

### 💾 Backend (Django & Python)
Construído com uma base sólida focada em segurança, escalabilidade e processamento de dados.

*   **Django Framework:** O coração da aplicação, escolhido pela sua robustez e facilidade em gerir modelos de dados complexos (pacientes, consultas, prontuários).
*   **Django Rest Framework (DRF):** Utilizado para construir uma API robusta que alimenta o frontend.
*   **JWT (SimpleJWT):** Gerenciamento de autenticação segura via cookies e tokens, garantindo que os dados médicos dos pacientes estejam sempre protegidos.
*   **Django Filters:** Implementação de buscas avançadas e filtragem de agendamentos e pacientes de forma performática.
*   **Apps Modulares:**
    *   `apps.clinic`: Gere todo o core clínico (Agendamentos, Atendimentos, Fichas).
    *   `apps.whatsapp`: Integração com serviços de mensageria para automação de lembretes e agendamentos via bot.
    *   `apps.billing` & `apps.subscriptions`: Gerenciamento de pagamentos e planos para o modelo SaaS.
    *   `apps.utils`: Central de respostas padronizadas (`ResponseBuilder`) e utilitários globais.

### 🎨 Frontend (Next.js & React)
Uma interface focada na experiência do usuário (UX), rápida, moderna e totalmente responsiva.

*   **Next.js 14 (App Router):** Utilizado para garantir performance superior, SEO e roteamento dinâmico.
*   **TypeScript:** Garantia de segurança de tipos em todo o fluxo de dados entre API e UI.
*   **Tailwind CSS & Shadcn/ui:** Design premium, minimalista e "clean", focado na produtividade do dentista dentro do consultório.
*   **TanStack Query (React Query):** Gerenciamento de estado e cache de dados da API, permitindo que a interface seja "viva" e reativa a mudanças em tempo real.
*   **Framer Motion:** Micro-animações que trazem uma sensação de fluidez e modernidade à plataforma.
*   **React Hook Form & Zod:** Validação rigorosa de formulários (prontuários e cadastros) para evitar erros de entrada de dados.

---

## 🎯 Diferenciais do NEXKODONTO

1.  **Independência de Secretária:** Foco total em automação de agenda.
2.  **UX Premium:** Interface que foge do visual "datado" dos softwares médicos tradicionais.
3.  **Foco em Automação via Bot:** O sistema "conversa" com o paciente, confirma horários e avisa sobre retornos automaticamente.
4.  **Escalabilidade SaaS:** Preparado para atender desde um consultório individual até grandes clínicas odontológicas.

---
*Este projeto é uma demonstração de como a tecnologia pode simplificar mercados tradicionais através de automação inteligente e design focado no usuário.*
