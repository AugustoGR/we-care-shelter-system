export enum UserRole {
  ADMIN = 'ADMIN',
  VOLUNTEER = 'VOLUNTEER',
}

export type UserProps = {
  id: string
  name: string
  email: string
  role: UserRole
  login: string
  avatarUrl: string
  htmlUrl: string
  createdAt: string
}
