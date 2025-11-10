import { api } from '../api'
import { authService, AuthResponse } from './auth.service'

export interface UpdateUserData {
  name?: string
  email?: string
  password?: string
  currentPassword?: string
}

export interface UpdateUserResponse {
  id: string
  email: string
  name: string
  role: string
  createdAt: string
  updatedAt: string
}

class UsersService {
  async updateUser(
    userId: string,
    data: UpdateUserData,
  ): Promise<UpdateUserResponse> {
    const response = await api.patch<UpdateUserResponse>(
      `/users/${userId}`,
      data,
    )

    // Atualiza o usuário no localStorage mantendo os dados atualizados
    const currentUser = authService.getUser()
    if (currentUser && currentUser.id === userId) {
      const updatedUser: AuthResponse['user'] = {
        ...currentUser,
        name: response.data.name,
        email: response.data.email,
        updatedAt: response.data.updatedAt,
      }
      authService.setUser(updatedUser)
    }

    return response.data
  }

  async getUser(userId: string): Promise<UpdateUserResponse> {
    const response = await api.get<UpdateUserResponse>(`/users/${userId}`)
    return response.data
  }
}

export const usersService = new UsersService()
