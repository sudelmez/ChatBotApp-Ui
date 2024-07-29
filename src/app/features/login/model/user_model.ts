export interface UserModel{
    token: string;
    name: string;
    surname: string;
    username: string;
}
export interface LoginResponse{
    token: string;
    userId: string;
}