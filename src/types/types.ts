export enum UserRole {
    User = 0,
    Admin = 1,
}

export interface IUser {
    id: string;
    role: UserRole;
    username: string;
    password: string;
}