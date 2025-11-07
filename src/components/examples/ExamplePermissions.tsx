/**
 * Exemplo de uso do hook usePermissions
 *
 * Este arquivo demonstra como implementar verificações de permissões
 * em componentes da interface para controlar acesso a funcionalidades
 *
 * REGRAS DE PERMISSÃO:
 *
 * 1. ADMIN:
 *    - Pode fazer tudo
 *    - Gerenciar módulos (ativar/desativar)
 *    - Gerenciar abrigo
 *    - Cadastrar/editar/deletar qualquer item
 *
 * 2. RESPONSÁVEL DO MÓDULO:
 *    - Pode editar seu próprio módulo
 *    - Pode adicionar/remover voluntários ao módulo
 *    - Pode criar/editar/deletar itens do módulo
 *
 * 3. VOLUNTÁRIO ASSOCIADO AO MÓDULO:
 *    - Pode criar/editar/deletar itens do seu módulo
 *    - Pode ler todos os módulos ativos
 *
 * 4. VOLUNTÁRIO (não associado):
 *    - Pode apenas ler todos os módulos ativos
 */

'use client'

import type { ShelterModuleProps } from '@/@types'
import { usePermissions } from '@/hooks'

export function ExamplePermissionsComponent({
  shelterId,
  modules,
}: {
  shelterId: string
  modules?: ShelterModuleProps[]
}) {
  const {
    isAdmin,
    canManageModuleActivation,
    canReadModule,
    canWriteInModule,
    canManageModule,
    isResponsibleForModule,
    isAssociatedWithModule,
  } = usePermissions()

  // Exemplo 1: Mostrar botão apenas para admin
  const renderAdminButton = () => {
    if (!canManageModuleActivation) return null

    return (
      <button onClick={() => console.log('Ativar/Desativar módulo')}>
        Gerenciar Ativação do Módulo
      </button>
    )
  }

  // Exemplo 2: Verificar permissão de escrita em um módulo específico
  const renderAddAnimalButton = () => {
    const canWrite = canWriteInModule('animals', modules)

    if (!canWrite) return null

    return (
      <button onClick={() => console.log('Adicionar animal')}>
        Adicionar Animal
      </button>
    )
  }

  // Exemplo 3: Mostrar diferentes botões baseados na permissão
  const renderModuleManagementButtons = (moduleId: string) => {
    const canManage = canManageModule(moduleId, modules)

    if (isAdmin) {
      return (
        <div>
          <button>Ativar/Desativar</button>
          <button>Gerenciar Voluntários</button>
          <button>Editar Módulo</button>
        </div>
      )
    }

    if (canManage) {
      return (
        <div>
          <button>Gerenciar Voluntários</button>
          <button>Editar Módulo</button>
        </div>
      )
    }

    return null
  }

  // Exemplo 4: Verificar se é responsável pelo módulo
  const renderResponsibleBadge = (moduleKey: string) => {
    if (isResponsibleForModule(moduleKey, modules)) {
      return <span className="badge">Responsável</span>
    }
    return null
  }

  // Exemplo 5: Verificar se está associado ao módulo
  const renderAssociatedBadge = (moduleKey: string) => {
    if (isAssociatedWithModule(moduleKey, modules)) {
      return <span className="badge">Voluntário</span>
    }
    return null
  }

  // Exemplo 6: Mostrar lista de módulos com permissões diferentes
  const renderModulesList = () => {
    if (!modules) return null

    return modules.map((mod) => {
      const canWrite = canWriteInModule(mod.moduleKey, modules)
      const canManage = canManageModule(mod.id, modules)
      const canRead = canReadModule(shelterId)

      if (!canRead) return null

      return (
        <div key={mod.id}>
          <h3>{mod.moduleKey}</h3>

          {renderResponsibleBadge(mod.moduleKey)}
          {renderAssociatedBadge(mod.moduleKey)}

          {canRead && <button>Ver Itens</button>}
          {canWrite && <button>Adicionar Item</button>}
          {canManage && <button>Gerenciar Módulo</button>}
        </div>
      )
    })
  }

  return (
    <div>
      <h1>Exemplo de Permissões</h1>

      {isAdmin && <p>Você é um ADMINISTRADOR</p>}

      {renderAdminButton()}
      {renderAddAnimalButton()}
      {renderModulesList()}
    </div>
  )
}

/**
 * COMO USAR EM SEUS COMPONENTES:
 *
 * 1. Import o hook:
 *    import { usePermissions } from '@/hooks'
 *
 * 2. Use no componente:
 *    const { isAdmin, canWriteInModule } = usePermissions()
 *
 * 3. Verifique permissões antes de renderizar:
 *    {canWriteInModule('animals', modules) && <AddButton />}
 *
 * 4. Para módulos específicos, passe a lista de módulos:
 *    const canEdit = canWriteInModule('resources', modules)
 *
 * 5. Para verificar gerenciamento de módulo:
 *    const canManage = canManageModule(moduleId, modules)
 */
