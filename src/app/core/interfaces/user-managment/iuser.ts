import { IRole } from "./irole"

export interface IUser {
    id: number
    name: string
    email: string
    password?: string
    role?: IRole
    roleId?: number

    
}
