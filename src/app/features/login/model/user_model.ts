export interface UserModel{
    token: string | null;
    name: string | null;
    surname: string | null;
    username: string | null;
}
export interface LoginResponse{
    token: string | null;
    userId: string | null;
    transactionId: string;
}