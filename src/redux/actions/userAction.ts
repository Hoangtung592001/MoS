export interface SignInRequest {
    username: string;
    password: string;
}

export interface SignUpRequest {
    username: string;
    password: string;
}

export interface SignInData {
    token: string;
}