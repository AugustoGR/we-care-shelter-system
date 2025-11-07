/**
 * Mensagens de erro padronizadas para o frontend
 */
export const ERROR_MESSAGES = {
  // Autenticação
  AUTH: {
    USER_NOT_AUTHENTICATED: 'Usuário não autenticado',
    INVALID_CREDENTIALS: 'Credenciais inválidas',
    USER_NOT_FOUND: 'Usuário não encontrado',
    TOKEN_INVALID: 'Token inválido ou expirado',
    SESSION_EXPIRED: 'Sua sessão expirou. Faça login novamente.',
  },

  // Permissões
  PERMISSION: {
    INSUFFICIENT_PERMISSION: 'Você não tem permissão para realizar esta ação',
    INSUFFICIENT_ROLE: 'Você não tem o nível de acesso necessário para esta ação',
    MODULE_READ_DENIED: 'Você não tem permissão de leitura neste módulo',
    MODULE_WRITE_DENIED: 'Você não tem permissão de escrita neste módulo',
    MODULE_MANAGE_DENIED: 'Você não tem permissão de gerenciamento neste módulo',
    SHELTER_ADMIN_ONLY: 'Apenas proprietários e administradores do abrigo podem realizar esta ação',
  },

  // Validação
  VALIDATION: {
    SHELTER_ID_REQUIRED: 'ID do abrigo é obrigatório',
    MODULE_ID_REQUIRED: 'ID do módulo é obrigatório',
    MODULE_KEY_REQUIRED: 'Chave do módulo é obrigatória para permissão de escrita',
    INVALID_DATA: 'Dados inválidos fornecidos',
    REQUIRED_FIELD: 'Este campo é obrigatório',
    INVALID_EMAIL: 'Email inválido',
    INVALID_PASSWORD: 'Senha deve ter no mínimo 6 caracteres',
  },

  // Recursos não encontrados
  NOT_FOUND: {
    SHELTER: 'Abrigo não encontrado',
    USER: 'Usuário não encontrado',
    VOLUNTEER: 'Voluntário não encontrado',
    ANIMAL: 'Animal não encontrado',
    RESOURCE: 'Recurso não encontrado',
    SHELTERED_PERSON: 'Abrigado não encontrado',
    MODULE: 'Módulo não encontrado',
    GENERIC: 'Registro não encontrado',
  },

  // Conflitos
  CONFLICT: {
    EMAIL_EXISTS: 'Email já cadastrado',
    CPF_EXISTS: 'CPF já cadastrado',
    ALREADY_EXISTS: 'Registro já existe',
  },

  // Erros gerais
  GENERAL: {
    INTERNAL_ERROR: 'Erro interno do servidor. Tente novamente mais tarde.',
    BAD_REQUEST: 'Requisição inválida',
    FORBIDDEN: 'Acesso negado',
    UNAUTHORIZED: 'Não autorizado',
    NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
    UNKNOWN_ERROR: 'Ocorreu um erro inesperado. Tente novamente.',
  },
} as const

/**
 * Mensagens de sucesso padronizadas
 */
export const SUCCESS_MESSAGES = {
  CREATED: 'Registro criado com sucesso',
  UPDATED: 'Registro atualizado com sucesso',
  DELETED: 'Registro excluído com sucesso',
  OPERATION_SUCCESS: 'Operação realizada com sucesso',
  LOGIN_SUCCESS: 'Login realizado com sucesso',
  LOGOUT_SUCCESS: 'Logout realizado com sucesso',
  REGISTER_SUCCESS: 'Cadastro realizado com sucesso',
} as const

/**
 * Mapeia códigos de status HTTP para mensagens de erro apropriadas
 */
export function getErrorMessage(error: any): string {
  // Erro de rede
  if (!error.response) {
    return ERROR_MESSAGES.GENERAL.NETWORK_ERROR
  }

  const status = error.response?.status
  const message = error.response?.data?.message

  // Se o backend retornou uma mensagem específica, usa ela
  if (message) {
    // Mapeia mensagens conhecidas do backend para as constantes
    const backendToFrontendMap: Record<string, string> = {
      'User not authenticated': ERROR_MESSAGES.AUTH.USER_NOT_AUTHENTICATED,
      'Usuário não autenticado': ERROR_MESSAGES.AUTH.USER_NOT_AUTHENTICATED,
      'Invalid credentials': ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS,
      'Credenciais inválidas': ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS,
      'User not found': ERROR_MESSAGES.AUTH.USER_NOT_FOUND,
      'Usuário não encontrado': ERROR_MESSAGES.AUTH.USER_NOT_FOUND,
      'Você não tem permissão de leitura neste módulo': ERROR_MESSAGES.PERMISSION.MODULE_READ_DENIED,
      'Você não tem permissão de escrita neste módulo': ERROR_MESSAGES.PERMISSION.MODULE_WRITE_DENIED,
      'Você não tem permissão de gerenciamento neste módulo': ERROR_MESSAGES.PERMISSION.MODULE_MANAGE_DENIED,
      'Você não tem o nível de acesso necessário para esta ação': ERROR_MESSAGES.PERMISSION.INSUFFICIENT_ROLE,
      'Apenas proprietários e administradores do abrigo podem realizar esta ação': ERROR_MESSAGES.PERMISSION.SHELTER_ADMIN_ONLY,
    }

    return backendToFrontendMap[message] || message
  }

  // Mapeia códigos de status HTTP
  switch (status) {
    case 400:
      return ERROR_MESSAGES.GENERAL.BAD_REQUEST
    case 401:
      return ERROR_MESSAGES.AUTH.SESSION_EXPIRED
    case 403:
      return ERROR_MESSAGES.PERMISSION.INSUFFICIENT_PERMISSION
    case 404:
      return ERROR_MESSAGES.NOT_FOUND.GENERIC
    case 409:
      return ERROR_MESSAGES.CONFLICT.ALREADY_EXISTS
    case 500:
      return ERROR_MESSAGES.GENERAL.INTERNAL_ERROR
    default:
      return ERROR_MESSAGES.GENERAL.UNKNOWN_ERROR
  }
}
