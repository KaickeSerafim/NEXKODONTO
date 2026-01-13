
/**
 * Utilitário para extrair a mensagem de erro mais específica de uma resposta de erro da API.
 * Suporta o formato do ResponseBuilder e erros padrão do Axios/DRF.
 */
export function parseBackendError(error: any): string {
  // 1. Mensagem de erro simples (Error constructor)
  let errorMessage = error.message || "Ocorreu um erro desconhecido";

  // 2. Se for um erro Axios com resposta do backend
  if (error.response?.data) {
    const data = error.response.data;

    // Formato ResponseBuilder: { status: "error", message: "...", errors: { ... } }
    if (data.errors) {
      const errors = data.errors;

      // a. Validações gerais (DRF non_field_errors)
      if (
        errors.non_field_errors &&
        Array.isArray(errors.non_field_errors) &&
        errors.non_field_errors.length > 0
      ) {
        return errors.non_field_errors[0];
      }

      // b. Validação de campo específico (pega o primeiro que achar)
      const firstErrorKey = Object.keys(errors).find(
        (k) => Array.isArray(errors[k]) && errors[k].length > 0
      );
      if (firstErrorKey) {
        // Formata o nome do campo para ficar mais legível (ex: duracao_minutos -> Duracao minutos)
        // ou simplesmente usa a key original. Vamos tentar capitalizar.
        const fieldName = firstErrorKey.charAt(0).toUpperCase() + firstErrorKey.slice(1).replace(/_/g, " ");
        const message = errors[firstErrorKey][0];
        
        // Se a mensagem for genérica ("Este campo é obrigatório."), prefixamos com o nome do campo.
        // Se a mensagem já contiver o nome do campo (algumas validações customizadas), não precisa.
        // Na dúvida, prefixar ajuda a identificar.
        return `${fieldName}: ${message}`; 
      }
    }

    // 3. Formato DRF padrão (sem ResponseBuilder wrapper de errors) ou fallback do ResponseBuilder
    // Se tiver key 'message' (ResponseBuilder top-level)
    if (data.message) {
        // Só retorna se não tiver errors mais especifícos, que já tratamos acima.
        return data.message;
    }
    
    // 4. Formato DRF padrão direto no data (ex: { field: ["error"] })
    // Verifica se tem keys que são arrays (exceto o message string)
    // Isso é fallback caso não esteja usando ResponseBuilder em views antigas
    const firstKey = Object.keys(data).find(k => Array.isArray(data[k]) && data[k].length > 0);
    if(firstKey) {
         return data[firstKey][0];
    }
  }

  return errorMessage;
}
