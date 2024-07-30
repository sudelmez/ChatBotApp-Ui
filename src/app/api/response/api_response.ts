export interface ApiResponse<T> {
    data: T | null;
    message: string | null;
    success: boolean;
    validationErrors : Array<string> | [];
}